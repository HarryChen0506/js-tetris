

// 当前玩家
function Player(){
    var game;
    var status = 'pause'; //默认暂停 ‘run’
    var timerId;
    var score = 0;
    // 绑定事件
    function bindEvent(){
        // var body = document.body;
        document.addEventListener('keydown', function(e){ 
            // console.log('e',e)
            switch(e.keyCode){
                case 38:                
                    game.rotate();
                    run()
                    break;
                case 39:
                    game.right();
                    run()
                    break;
                case 37:
                    game.left();
                    run()
                    break;
                case 40:
                    game.down();
                    run()
                    break;
                case 32:
                    game.fall();
                    run()
                    break;
                case 81: //Q键
                    _play();
                    break;
                default:
                    break;
            }       
        })
    } 
    // 初始化
    function _start(){
        game = new Game();
        game.init({
            doms: {
                game: document.getElementById('game'),
                next:  document.getElementById('next'),
                dir: document.getElementById('dir')
            }
        });
        bindEvent();
        run();
        showScore();
    }
    // 向下移动
    function move(){
        if(!game.down()){
            // 如果不能继续向下，则将当前方块固定在底部
            game.fixed();
            // 检测能否消分
            game.clearSquare(function(data){
                if(data>0){                    
                    calScore(data);
                    showScore();
                }               
            });
             // 执行下一条
            game.runNext();
        }    
    }
    //开始
    function run(){
        status = 'run';
        // console.log(status)
        if(!timerId){
            timerId = setInterval(move, 1000)
        }        
    }
    // 暂停
    function pause(){
        status = 'pause';
        // console.log(status);
        clearInterval(timerId);
        timerId = null
    }
    // 开关按钮
    function _play(){
        if(status==='run'){
            // 暂停
            pause()
        }else{
            // 开始
            run()
        }
    }
    //计算分数 
    function calScore(level){       
        switch(level){
            case 1:
                score += 10;
                break;
            case 2:
                score += 30;
                break;
            case 3:
                score += 60;
                break;
            case 4:
                score += 80;
                break;
            default:
                break
        }
    }
    // 刷新分数
    function showScore(){
       var dom_score = document.getElementById('score');
       dom_score.innerHTML = score;

    }

    //暴露接口
    this.start = _start;  // 初始化    
}

var player = new Player();
player.start();







