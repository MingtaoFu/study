/**
 *
 * Created by mingtao on 15-7-22.
 */

//初始化
var container = document.getElementById('container');

var renderer = new THREE.WebGLRenderer({antialias:true});
renderer.setSize(container.offsetWidth, container.offsetHeight);
renderer.setClearColor(0xeeeeee);
container.appendChild(renderer.domElement);

//场景
var scene = new THREE.Scene();

//相机
var camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 10000);
//
//camera.rotation.x = Math.PI / 2;
camera.up.x = 0;
camera.up.y = 0;
camera.up.z = -1;
camera.lookAtNew( {x:0, y:0, z:200} );
console.log(camera.rotation);
var camera_pa = new THREE.Object3D();
camera_pa.add(camera);
var camera_grandpa = new THREE.CameraContainer();
camera_grandpa.add(camera_pa);
camera_grandpa.position.set(-100, -100, 200);
camera.position.set(0, 0, 0);
scene.add(camera_grandpa);

//环境光
var ambientLight = new THREE.AmbientLight(0xff00ff);
scene.add(ambientLight);

//平行光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 0, 5000);
scene.add(directionalLight);

//准心
var sphere_aimPoint = new THREE.SphereGeometry(0.05,30,30);
var aimPoint_material = new THREE.MeshBasicMaterial({color: 0x00ffff});
var aimPoint = new THREE.Mesh(sphere_aimPoint, aimPoint_material);
console.log(camera.rotation.y);
aimPoint.position.x = 0;//camera.position.x + 10*Math.cos(camera.rotation.y);
aimPoint.position.y = 0;//camera.position.y - 10*Math.sin(camera.rotation.y);
aimPoint.position.z = -5;//camera.position.z;
camera.add(aimPoint);


//var axes = new THREE.AxisHelper( 20 );
//camera.add(axes);

//地面
var plane_land = new THREE.PlaneGeometry(10000, 10000);
var land_material = new THREE.MeshLambertMaterial({color: 0x00ff00});   //#C69A23
var land = new THREE.Mesh(plane_land, land_material);
//land.rotation.x = Math.PI / 2;
scene.add(land);

//尝试创建一个物体
var wall = new Wall(100, 100, 500, {x:20, y: 20, z: 20});
var wall1 = new Wall(100, 100, 500, {x:100, y: 220, z: 20});
var wall2 = new Wall(100, 100, 500, {x:240, y: 720, z: 20});
var wall3 = new Wall(100, 100, 500, {x:520, y: 320, z: 20});
scene.add(wall);
scene.add(wall1);
scene.add(wall2);
scene.add(wall3);


//绑定移动事件
(function () {
    var hash = {87:'front', 65:'left', 68:'right', 83:'back'};
    document.addEventListener('keydown', function(e) {
        console.log(e.keyCode);
        //camera.move(e.keyCode, 5);
        camera_grandpa.setMoveProperties(0.1, hash[e.keyCode], 6);
        console.log(camera_grandpa.moveJSON.back.accelerate);
        console.log(camera_grandpa.moveJSON['left'].active);
        if (camera_grandpa.moveJSON[hash[e.keyCode]].active == false) {
            camera_grandpa.moveJSON[hash[e.keyCode]].active = true;
            camera_grandpa.moveJSON[hash[e.keyCode]].interval = setInterval(function() {
                if(!camera_grandpa.move(hash[e.keyCode])) {
                    clearInterval(camera_grandpa.moveJSON[hash[e.keyCode]].interval);
                    camera_grandpa.moveJSON[hash[e.keyCode]].active = false;
                }
            },16.67);
        }
    });

    document.addEventListener('keyup', function(e) {
        camera_grandpa.setMoveProperties(-0.1, hash[e.keyCode], 6);
    });
})();


var ww = camera_grandpa.rotation.y;
//渲染
function render() {
    //camera.matrix.elements[2] += 0.1;
    /*
    aimPoint.position.x = camera_grandpa.position.x + 10*Math.cos(ww);
    aimPoint.position.y = camera_grandpa.position.y + 10*Math.sin(ww);
    aimPoint.position.z = camera_grandpa.position.z + Math.sin(camera_pa.rotation.y);
    */
   // var delta = clock.getDelta();
    //control.update(delta);
    renderer.render(scene, camera);
    requestAnimationFrame(render);
}

//捕获鼠标
(function () {
    var elem = document.getElementById('container');
    document.addEventListener('click', function () {


        try {
            elem.requestPointerLock();
        } catch (e) {
            elem.mozRequestPointerLock();
        }

    });
    document.addEventListener('mousemove', function (e) {
        console.log(document.webkitPointerLockElement);
        if (document.mozPointerLockElement === elem || document.pointerLockElement === elem) {

            //camera.lookAtNew({x:camera.eye.x + e.movementX/10, y:camera.eye.y + e.movementY/10, z:200});
            camera_grandpa.rotation.z -= e.movementX / 200;
            camera_pa.rotation.y += e.movementY / 200;
            camera_pa.rotation.y = Math.min(Math.PI, Math.max(camera_pa.rotation.y, 0));

            ww -= e.movementX / 200;
            //camera.rotation.x += e.movementY/200 * (Math.cos(ww));
            //camera.rotation.z += e.movementY/200 * (Math.sin(ww));
            //camera.lookAt({x: Math.cos(camera.rotation.y), y:Math.sin(camera.rotation.y), z:z});
        }
    });
})();
render();
















