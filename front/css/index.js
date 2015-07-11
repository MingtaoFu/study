var menu_btn = document.getElementById('menu_btn');
var drop_down = document.getElementById('drop_down');
drop_down.status = 'up';
var group = ['ALG','Web','Android','PM','Design','IT','ESD','IOS'];

var drop_container = document.getElementById('drop_container');

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

//regexp    search
var search = document.getElementById('search');
search.addEventListener('input',function(){
    drop_container.innerHTML = '';
    var re = new RegExp(this.value, 'i');
    for (var i in group) {
        if (group[i].match(re) && this.value != '') {
            var new_ele = document.createElement('a');
            new_ele.className = 'search_drop_list';
            new_ele.innerHTML = group[i];
            new_ele.href = 'javascript:void(0)';
            new_ele.addEventListener('click',function(){
                search.value = this.innerHTML;
                drop_container.innerHTML = '';
            });
            drop_container.appendChild(new_ele);
        }
    }
    delete re;
});
