$(function(){
  /** AJAX 加载动画 **/
  $(document).on({
    ajaxStart: function(){$(".windows8").show();},
    ajaxStop: function(){$(".windows8").hide();$("#main").show();}
  });
  $("#main").load('main.html');
})

function page(e){
  var url = $(e).attr('href');
  var height = $(url).offset().top;

  $("html,body").animate({scrollTop: height}, 1000);
}

function page2(){
  alert(1);
  return false;
}
