var menu_btn = document.getElementById('menu_btn');
var drop_down = document.getElementById('drop_down');
drop_down.status = 'up';

menu_btn.addEventListener('click',function(){
    if (drop_down.status == 'up'){
        drop_down.style.height = '0px';
        drop_down.style.display = 'block';
        setTimeout(function(){
            drop_down.style.height = '290px';
        },1);
        drop_down.status = 'down';
    } else {
        drop_down.style.height = '0px';
        drop_down.status = 'up';
    }
});

var body = document.getElementsByTagName('body')[0];
window.onresize = function(){ 
    if (body.offsetWidth >= 810){
        console.log(1);
        drop_down.style.display = '';
        drop_down.style.height = '100%';
        drop_down.status = 'up';
    }
};
