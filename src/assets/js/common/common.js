console.log('进入common.js')
var age = 16

var obj = {
  sayHello:function(){
    console.log('obj.sayHello!')
  },
  xmHello:function(){
    console.log('xmHello')
  }
}
console.log($('h1').html()+"我是common.js输出的");
module.exports = obj;