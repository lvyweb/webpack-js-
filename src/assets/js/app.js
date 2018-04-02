var myObj = require('./common/common.js');
require('../css/index/index.css');
require('../../assets/less/libs.less');
console.log($('h1').html()+"我是app.js输出的");

//------
var main = {
    index: function () {
        import(/* webpackChunkName: "index" */
            './index/index.js')
    },  
    register: function () {
        import(
            /* webpackChunkName: "register" */
            './index/register.js'
            )
    }
}

var lcellMain = $('body').data('main');
function need(learnId) {
    for (key in main){
        if(key == learnId ) {
            main[key]();
        }
    }
}
need(lcellMain);
//------



// var index = function index() {
//     return import(
//     /* webpackChunkName: "index" */
//     './index/index.js');
// };


// var register = function register() {
//     return import(
//     /* webpackChunkName: "register" */
//     './index/register.js');
// };


// if($('body').data('main')=="index"){
//      index();
// }
// if($('body').data('main')=="register"){
//      register();
// }