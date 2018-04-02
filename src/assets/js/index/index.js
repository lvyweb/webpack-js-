require('../../css/index/index.css');
$('body').css('backgroundColor','#f2f2f2');
 $("#myTab a").click(function(e){
        e.preventDefault();
        $(this).tab("show");
  });


console.log('进入index.js了')
console.log($('h1').html()+"我是index.js输出的");
