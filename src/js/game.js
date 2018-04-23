// 游戏核心类
/**
 * 
 * @param {*} config 配置参数 { gameData, nextDataList, doms}
 * @param {*} gameData 要挂载的容器
 * 
 */
function Game(config){    
    var gameData = [
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,0,0,0,0,0],
        [0,0,0,0,0,1,0,0,0,0],
        [1,1,0,1,1,1,1,0,0,0],
    ]
    var nextData = [];
    var curData = [];
    var origin = {
        x: 0,
        y: 0
    }
    var gameDivs = this.gameDivs = [];  // 游戏区span dom集合
    var nextDivs = this.nextDivs = [];  // 下个方块span dom集合   
       
    var gameDiv = null;  //游戏区容器
    var nextDiv = null;  //下个方块容器
    var dirDiv = null;    // 方向容器
    
    var curSquare = null;  //当前方块
    var nextSquare = null; //下个方块


    // 方法
    //从方块拷贝数据到游戏区
    function copyData(gameData, curData, origin){
        // gameData 游戏数据
        // nextData 方块数据
        // 开始位置          
        for(var i=0; i<curData.length; i++){
            for(var j=0; j<curData[i].length; j++){
                if(checkDotValid(origin, i, j)){
                    gameData[origin.x + i][origin.y + j] = curData[i][j]
                }                
            }
        }
    }
    //清空游戏区数据
    function clearData(gameData, curData, origin, value){
        for(var i=0; i<curData.length; i++){        
            for(var j=0; j<curData[i].length; j++){               
                if(checkDotValid(origin, i, j)){
                    gameData[origin.x + i][origin.y + j] = value                    
                }                 
            }
        }
    }
    // 渲染区域
    function renderDiv(container, data, divs){        
        for(var i=0; i<data.length; i++){    
            var rowDivs = [];    
            for(var j=0; j<data[i].length; j++){
                var type = data[i][j];
                var span = document.createElement('span');                
                span.style.top = i*20 + 'px';
                span.style.left = j*20 + 'px'; 
                container.appendChild(span);
                rowDivs.push(span)
            }
            divs.push(rowDivs)
        }
    }
    // 重新渲染区域
    function refreshDiv(data, divs){
        for(var i=0; i<data.length; i++){        
            for(var j=0; j<data[i].length; j++){
                var type = data[i][j];
                var span = divs[i][j];                          
                if(type===0){
                    span.setAttribute('class','box box-none');
                }else if(type===1){
                    span.setAttribute('class','box box-dead');
                }else if(type===2){
                    span.setAttribute('class','box box-next');
                }  
            }
        }
    }
    // 渲染所有区域
    function render(){
        renderDiv(gameDiv, gameData, gameDivs)
        renderDiv(nextDiv, nextSquare.data, nextDivs)
    }
    // 刷新页面
    function fresh(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                 //先清空旧数据
        copyData(gameData, curSquare.data, curSquare.origin)    //拷贝新数据
        refreshDiv(gameData, gameDivs)                            //刷新游戏区
        refreshDiv(nextSquare.data, nextDivs)                            //刷新方块
    }
    function init(config){
        var doms = config.doms ||{};  
        gameDiv = doms.game || document.getElementById('game');  //游戏区容器
        nextDiv = doms.next || document.getElementById('next');  //下个方块容器
        dirDiv = doms.dir || document.getElementById('dir');    // 方向容器  
        // curSquare = nextSquare = new Square();  //下一个方块复制给当前
        curSquare = nextSquare = squareFactory(6, 0);  //下一个方块复制给当前
        render();   
        fresh();   
    }

    /**
     * 检测点是否合法
     * @param {*} origin 检测方块的原点坐标
     * @param {*} row 待监测方块点的行数
     * @param {*} col 待监测方块点的列数
     */
    function checkDotValid(origin, row, col){        
        var x = origin.x||0;
        var y = origin.y||0;
        var maxRow = gameData.length; //最大的行数
        var maxCol = gameData[0].length; //最大列数
        if(x+row <0){
            // 超出游戏区上面
            return false
        }else if(x+row >= maxRow){
            // 超出游戏区下面
            return false
        }else if(y+col <0 ){
            // 超出游戏区左面
            return false
        }else if(y+col >= maxCol ){
            // 超出游戏区右面
            return false
        }else if( gameData[x+row][y+col] ===1 ){
            // 该位置已有灰色的方块
            return false
        }
        return true
    }
   
    /**
     * 检测方块整体是否合法
     * @param {*} origin 方块的原点位置
     * @param {*} data   方块的数据
     */
    function checkSquareValid(origin, data){
        for(var i=0; i<data.length; i++){
            for(var j=0; j<data[i].length; j++){
                if(data[i][j]!==0){
                    // 该点是实体点
                    if(!checkDotValid(origin, i, j)){
                        return false
                    }                    
                }
            }
        }
        return true
    }

    
    //显示操作
    function showAct(container, act){
        container.innerHTML = act;
        console.log('act', act)
    }   
    //向下 
    function nextDown(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.down();   //       
        copyData(gameData, curSquare.data, curSquare.origin)    //拷贝新数据
        refreshDiv(gameData, gameDivs)          //刷新游戏区
    }
    function down(){  
        showAct(dirDiv, 'down');
        if(curSquare.canDown(checkSquareValid)){
            console.log('合法')
            nextDown(); 
            return true          
        }; 
        return false
    }
    //向左
    function nextLeft(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.left();   //        
        copyData(gameData, curSquare.data, curSquare.origin)    //拷贝新数据
        refreshDiv(gameData, gameDivs)          //刷新游戏区
    }
    function left(){  
        showAct(dirDiv, 'left');
        if(curSquare.canLeft(checkSquareValid)){
            console.log('合法')
            nextLeft();           
        }; 
    }
    //向右
    function nextRight(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据
        curSquare.right();   //        
        copyData(gameData, curSquare.data, curSquare.origin)    //拷贝新数据
        refreshDiv(gameData, gameDivs)          //刷新游戏区
    }
    function right(){  
        showAct(dirDiv, 'right');
        if(curSquare.canRight(checkSquareValid)){
            console.log('合法')
            nextRight();           
        }; 
    }
    //旋转
    function nextRotate(){
        clearData(gameData, curSquare.data, curSquare.origin, 0);                  //先清空旧数据        
        curSquare.rotate();   // 旋转       
        copyData(gameData, curSquare.data, curSquare.origin)    //拷贝新数据
        refreshDiv(gameData, gameDivs)          //刷新游戏区
    }
    function rotate(){  
        showAct(dirDiv, 'rotate');
        if(curSquare.canRotate(checkSquareValid)){
            console.log('合法')
            nextRotate();           
        }; 
    }
    // 坠落
    function fall(){
        while(this.down()){
            // this.down()
        }
    }
    // 固定当前方块
    function fixed(){
         // 开始位置          
        for(var i=0; i<curSquare.data.length; i++){
            for(var j=0; j<curSquare.data[i].length; j++){
                if(checkDotValid(curSquare.origin, i, j)){
                    if(gameData[curSquare.origin.x + i][curSquare.origin.y + j] === 2){
                        gameData[curSquare.origin.x + i][curSquare.origin.y + j] = 1
                    }                    
                }                
            }
        }
        refreshDiv(gameData, gameDivs)          //刷新游戏区
    }
    
    // 导出api
    this.init = init;
    this.down = down;    
    this.left = left;    
    this.right = right;  
    this.rotate = rotate;  
    this.fall = fall;
    this.fixed = fixed;
}