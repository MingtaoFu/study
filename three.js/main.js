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
var camera = new THREE.PerspectiveCamera(60, container.offsetWidth / container.offsetHeight, 0.1, 1000);
camera.position.set(-100, 100, 200);
//camera.rotation.x = Math.PI / 2;
camera.up.x = 0;
camera.up.y = 0;
camera.up.z = 1;
camera.lookAtNew( {x:1, y:1, z:200} );
console.log(camera.rotation);
scene.add(camera);

//环境光
var ambientLight = new THREE.AmbientLight(0xff00ff);
scene.add(ambientLight);

//平行光
var directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(0, 0, 5000);
scene.add(directionalLight);

//准心
var sphere_aimPoint = new THREE.SphereGeometry(0.1,30,30);
var aimPoint_material = new THREE.MeshBasicMaterial({color: 0x00ffff});
var aimPoint = new THREE.Mesh(sphere_aimPoint, aimPoint_material);
console.log(camera.rotation.y);
aimPoint.position.x = camera.position.x + 10*Math.cos(camera.rotation.y);
aimPoint.position.y = camera.position.y - 10*Math.sin(camera.rotation.y);
aimPoint.position.z = camera.position.z;
scene.add(aimPoint);

//地面
var plane_land = new THREE.PlaneGeometry(1000, 1000);
var land_material = new THREE.MeshLambertMaterial({color: 0x00ff00});   //#C69A23
var land = new THREE.Mesh(plane_land, land_material);
//land.rotation.x = Math.PI / 2;
scene.add(land);

//尝试创建一个物体
var wall = new Wall(100, 100, 500);
scene.add(wall);


//绑定移动事件
(function () {
    var hash = {87:'front', 65:'left', 68:'right', 83:'back'};
    document.addEventListener('keydown', function(e) {
        console.log(e.keyCode);
        //camera.move(e.keyCode, 5);
        camera.setMoveProperties(0.1, hash[e.keyCode], 6);
        console.log(camera.moveJSON.back.accelerate);
        console.log(camera.moveJSON['left'].active);
        if (camera.moveJSON[hash[e.keyCode]].active == false) {
            camera.moveJSON[hash[e.keyCode]].active = true;
            camera.moveJSON[hash[e.keyCode]].interval = setInterval(function() {
                if(!camera.move(hash[e.keyCode])) {
                    clearInterval(camera.moveJSON[hash[e.keyCode]].interval);
                    camera.moveJSON[hash[e.keyCode]].active = false;
                }
            },16.67);
        }
    });

    document.addEventListener('keyup', function(e) {
        camera.setMoveProperties(-0.1, hash[e.keyCode], 6);
    });
})();


var ww = camera.rotation.y;
//渲染
function render() {
    aimPoint.position.x = camera.position.x + 10*Math.cos(ww);
    aimPoint.position.y = camera.position.y + 10*Math.sin(ww);
    aimPoint.position.z = camera.position.z;
    var delta = clock.getDelta();
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
            camera.rotation.y += e.movementX / 200;
            ww -= e.movementX / 200;
            //camera.rotation.x += e.movementY/200 * Math.abs(Math.sin(camera.rotation.y));
            //camera.rotation.z += e.movementY/200 * Math.abs(Math.cos(camera.rotation.y));
        }
    });
})();
render();
















