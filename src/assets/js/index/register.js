var registerjs = {
  sayHello:function(){
    console.log('register.js')
  },

}
console.log('进入registerjs了');
console.log($('h1').html()+"我是register.js输出的");
module.exports = registerjs;