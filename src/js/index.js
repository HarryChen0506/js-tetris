

// 当前玩家
function Player(){
    var game;
    var status = 'pause'; //默认暂停 ‘run’
    var timerId;
    // 绑定事件
    function bindEvent(){
        // var body = document.body;
        document.addEventListener('keydown', function(e){ 
            console.log('e',e)
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
        run()
    }
    // 向下移动
    function move(){
        if(!game.down()){
            // 如果不能继续向下，则将当前方块固定在底部
            game.fixed()
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

    //暴露接口
    this.start = _start;  // 初始化    
}

var player = new Player();
player.start();







