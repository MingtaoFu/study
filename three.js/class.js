/**
 *
 * Created by mingtao on 15-7-22.
 */
/*
function Wall(width, height, depth) {
    THREE.BoxGeometry.call(this, width, height, depth);


}

Wall.prototype = THREE.BoxGeometry.prototype;


*/
THREE.Camera.prototype.eye = {x:0, y:0, z:0};
THREE.Camera.prototype.lookAtNew = function(Object) {
    this.eye = Object;
    this.lookAt(Object);
};

//墙壁对象
function Wall(width, height, depth) {
    var material = new THREE.MeshLambertMaterial( {color: 0x00ffff} );  //'#C8DBDB'
    var geometry = new THREE.BoxGeometry(width, height, depth);
    var box = new THREE.Mesh(geometry, material);
    return box;
}

//随机游走对象
function Walker() {
    var x;
    var y;
}

//移动前的准备工作
//由于相机只有一个，姑且把其写在prototype里，但以后肯定要改
THREE.PerspectiveCamera.prototype.moveJSON = {
    'front':{speed:0, accelerate:0, active:false},
    'left':{speed:0, accelerate:0, active:false},
    'right':{speed:0, accelerate:0, active:false},
    'back':{speed:0, accelerate:0, active:false}
};

THREE.PerspectiveCamera.prototype.setMoveProperties = function(accelerate, direction, limitedSpeed) {
    //this.direction.speed = speed;
    this.moveJSON[direction].accelerate = accelerate;

    console.log(this.moveJSON[direction].accelerate);
    this.limitedSpeed = limitedSpeed || this.limitedSpeed;
};

//移动函数
THREE.PerspectiveCamera.prototype.move = function (direction) {
    //console.log(direction);
    var This = this.moveJSON[direction];
    if (This.accelerate < 0 && This.speed == 0) {
        return false;
    }


    var deltaX = this.eye.x - this.position.x;
    var deltaY = this.eye.y - this.position.y;
    if (This.speed <= this.limitedSpeed && This.speed >= 0) {
        console.log(This.accelerate);
        This.speed += This.accelerate;
        if (This.speed > this.limitedSpeed) {
            This.speed = this.limitedSpeed;
        } else if (This.speed < 0) {
            This.speed = 0;
        }
    }

    var distance = Math.sqrt(Math.pow(deltaX, 2) + Math.pow(deltaY, 2)) / This.speed;
    //console.log(camera.moveJSON.back.speed);
    //alert(distance);
    var move = {x:0, y:0};
    switch (direction){
        case 'left':{
            move.x = - deltaY / distance;
            move.y = deltaX / distance;
            break;
        }
        case 'right':{
            move.x = deltaY / distance;
            move.y = - deltaX / distance;
            break;
        }
        case 'front':{
            move.x = deltaX / distance;
            move.y = deltaY / distance;
            break;
        }
        case 'back':{
            move.x = - deltaX / distance;
            move.y = - deltaY / distance;
            break;
        }
        default :break;
    }
    this.position.x += move.x;
    this.position.y += move.y;
    return true;

};
