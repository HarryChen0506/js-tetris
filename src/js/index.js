
var game = new Game();
game.init({
    doms: {
        game: document.getElementById('game'),
        next:  document.getElementById('next'),
        dir: document.getElementById('dir')
    }
});

// 绑定事件
function bindEvent(){
    // var body = document.body;
    document.addEventListener('keydown', function(e){ 
        switch(e.keyCode){
            case 38:                
                game.rotate();
                break;
            case 39:
                game.right();
                break;
            case 37:
                game.left();
                break;
            case 40:
                game.down();
                break;
            case 32:
                game.fall();
                break;
            default:
                break;
        }       
    })
}
 
bindEvent()




