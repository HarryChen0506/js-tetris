
// 工具函数
(function (win, undefined){
    /**  
     * 将矩阵旋转90度
     * @params matrix 目标矩阵
     * return 旋转的新矩阵
     */    
    var rotate = function( matrix ){  
        //  matrix 为正方形矩阵 
        var length = matrix[0].length;
        // rotatedMatrix 转换后的矩阵
        var rotatedMatrix = [];
        for(var i=0; i< length; i++){            
            var row = [];
            for(var j=0; j< length; j++){                
                row[j] = matrix[length-j-1][i];                 
            }
            rotatedMatrix.push(row)
        }  
        return rotatedMatrix      
    }
    var Util = {
        rotate: rotate
    }
    win.Util = Util
})(window)