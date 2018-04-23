// 每种方块的构造函数
function  Square(){ 
    this.dir = 0;
    this.data =  [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
        ];  
    this.origin = {
        x: 0,
        y: 0
    }
}
Square.prototype = {
    down: function(){
        this.origin.x = this.origin.x + 1;  // 向下操作
    },
    left: function(){
        this.origin.y = this.origin.y - 1;  // 向左操作
    },
    right: function(){
        this.origin.y = this.origin.y + 1;  // 向右操作
    },
    rotate: function(dirNum){  
        if(dirNum===undefined){
            dirNum = 1
        }  
        this.dir += dirNum;
        this.dir = this.dir%4;
        this.data = this.dataList[this.dir];       
    },
    canDown: function(isValid){
        var testOrigin = {
            x: this.origin.x +1 ,
            y: this.origin.y
        }
        return isValid(testOrigin, this.data)
    },
    canLeft: function(isValid){
        var testOrigin = {
            x: this.origin.x ,
            y: this.origin.y -1
        }
        return isValid(testOrigin, this.data)
    },
    canRight: function(isValid){
        var testOrigin = {
            x: this.origin.x ,
            y: this.origin.y +1
        }
        return isValid(testOrigin, this.data)
    },
    canRotate: function(isValid){
        var testDir = this.dir +1;
        testDir = testDir%4;
        var testData = this.dataList[testDir];
        return isValid(this.origin, testData)
    }
}