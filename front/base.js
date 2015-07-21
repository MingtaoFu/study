/**
 *
 *
 *
 * Created by mingtao on 15-7-15.
 */
//得到下个兄弟元素
function getNextNode(node) {
    //既可传对象也可传ID
    node = typeof node=='string' ? document.getElementById(node) : node;
    var nextNode = node.nextSibling;
    if (!nextNode) return null;
    if (!document.all) {
        while (true) {
            if (nextNode.nodeType == 1) {
                break;
            } else {
                if (nextNode.nextSibling) {
                    nextNode = nextNode.nextSibling;
                } else {
                    break;
                }
            }
        }
    }
    return nextNode;
}

//设置透明度
function setOpacity(node, level) {
    //level∈[0,100]
    node = typeof node=='string' ? document.getElementById(node) : node;
    if (document.all) {
        node.style.filter = 'alpha(opacity=' + level + ')';
    } else {
        node.style.opacity = level / 100;
    }

}

//绑定事件
function on(node, eventType, handler) {
    node = typeof node=='string' ? document.getElementById(node) : node;
    if (document.all) {
        node.attachEvent('on' + eventType ,handler);
    } else {
        node.addEventListener(eventType , handler, false);
    }
}

//去除首尾空白
function trim(ostr) {
    return ostr.replace(/^\s+|\s+$/g, '');
}

function isNumber(s) {
    return !isNaN(s);
}
function isString(s) {
    return typeof s === 'string';
}
function isBoolean(s) {
    return typeof s === 'boolean';
}
function isFunction(s) {
    return typeof s === 'function';
}
function isNull(s) {
    return s === null;
}
function isUndefined(s) {
    return typeof s === 'undefined';
}
function isArray(s) {
    return s instanceof Array;
}

//继承
function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F();
    subClass.prototype.constructor = subClass;
    subClass.superclass = superClass.prototype;
    if (superClass.prototype.constructor == Object.prototype.constructor) {
        superClass.prototype.constructor = superClass;
    }
}
