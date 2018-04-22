
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
    [0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0],

]
var nextData = [
    [2,2,0,0],
    [0,2,2,0],
    [0,0,0,0],
    [0,0,0,0],
]
var origin = {
    x: 0,
    y:3
}

var gameDiv = document.getElementById('game');
var nextDiv = document.getElementById('next');
var dirDiv = document.getElementById('dir');

//拷贝数据

function copyData(gameData, nextData, origin){
    // gameData 游戏数据
    // nextData 方块数据
    // 开始位置 
    clearData(gameData, 0)   
    for(var i=0; i<nextData.length; i++){
        for(var j=0; j<nextData[i].length; j++){
            gameData[origin.x + i][origin.y + j] = nextData[i][j]
        }
    }
}
function clearData(gameData, value){
    for(var i=0; i<gameData.length; i++){        
        for(var j=0; j<gameData[i].length; j++){
           gameData[i][j] = value
        }
    }
}

// 渲染游戏区域
function renderDiv(container, data){
    container.innerHTML = '';
    for(var i=0; i<data.length; i++){        
        for(var j=0; j<data[i].length; j++){
            var type = data[i][j];
            var span = document.createElement('span');
            span.style.top = i*20 + 'px';
            span.style.left = j*20 + 'px';            
            if(type===0){
                span.setAttribute('class','box box-none');
            }else if(type===1){
                span.setAttribute('class','box box-dead');
            }else if(type===2){
                span.setAttribute('class','box box-next');
            }
            container.appendChild(span)
        }
    }
}

function render(){
    renderDiv(gameDiv, gameData)
    renderDiv(nextDiv, nextData)
}
//显示操作
function showAct(container, act){
    container.innerHTML = act
}

function fresh(){
    copyData(gameData, nextData, origin)
    render();
}
fresh();







//向下 
function next_down(origin){
    origin.x = origin.x +1;
    origin.y = origin.y;
}
function _down(){
    console.log('down')
    next_down(origin);
    fresh()
}


function act_up(){
    showAct(dirDiv, 'up')
}
function act_down(){
    showAct(dirDiv, 'down');
    _down()
}
function act_left(){
    showAct(dirDiv, 'left')
}
function act_right(){
    showAct(dirDiv, 'right')
}
function act_fall(){
    showAct(dirDiv, 'fall')
}


// 绑定事件
function bindEvent(){
    // var body = document.body;
    document.addEventListener('keydown', function(e){ 
        switch(e.keyCode){
            case 38:                
                act_up()
                break;
            case 39:
                act_right()
                break;
            case 37:
                act_left()
                break;
            case 40:
                act_down()
                break;
            case 32:
                act_fall()
                break;
            default:
                break;
        }       
    })
}
 
bindEvent()




