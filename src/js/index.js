
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
                
                break;
            case 39:
                
                break;
            case 37:
                
                break;
            case 40:
                game.down();
                break;
            case 32:
                
                break;
            default:
                break;
        }       
    })
}
 
bindEvent()




