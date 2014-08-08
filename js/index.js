$(function(){
  /** 加载动画 **/
  $(document).on({
    ajaxStart: function(){$(".windows8").show();},
    ajaxStop: function(){$(".windows8").hide();$("#main").show();}
  });

  /** 设置页面数据 **/
  var height = window.innerHeight;
  $("body").css("background-size", "100% "+height+"px");
  $.getJSON("cdoc.json", function(result){
    $("title").html(result.title);

    var menu = "<ul id='menu'>";
    for(var i = 0; i < result.content.length; i++){
      var item = result.content[i];
      var html = "<div class='item' id='item"+i+"' style='height:"+height+"px;'><div class='title'>";
      html += "<h1>"+item.title+"</h1></div>";
      html += "<div class='content'>"+item.content+"</div></div>";
      var nav = "<div style='width:100%;height:"+height/result.content.length+"px;' title="+item.title+" href='#item"+i+"' onClick='page(this)'></div>";
      if(i!=0){
        menu += "<li href='#item"+i+"' onClick='page(this)'><span>"+i+"</span>"+item.title+"</li>";
      }
      /** 生成快捷导航 **/
      $("#left").append(nav);

      /** 生成页面主体 **/
      $("#main").append(html);
    }

    /** 生成菜单 **/
    menu += "</ul>";
    $(".content:first").html(menu);

  });

  /** 导航栏鼠标事件 **/
  $("#left").children("div").mouseover(function(event){
    if($(this).css("background") == '#fff'){
      return false;
    }
    $(this).animate({width: "500%"}, '2000');
    var title = $(this).attr("title");
    $(this).html(title);
  });
  $("#left").children("div").mouseout(function(){
    $(this).animate({width: "100%"}, "2000");
    $(this).html('');
  })

  /** 导航栏状态监听 **/
  setInterval(function(){
    var height = window.innerHeight;
    var scrollTop = $("html,body").scrollTop();
    var other = scrollTop % height;
    var index = (scrollTop - other) / height;
    var current = $("#left").children("div:eq("+index+")");
    if(!current.css("background")){
      $("#left").children("div").css("background","#3498DB");
      current.css("background","#fff");
    }
  }, "10");

  var menu = $("#menu").children("div");
  for(var i=0; i < menu.length; i++){
    $(menu[i]).animate({left:"400px"}, "1000");
  }

  /** 鼠标滚轮事件 **/
  $(".item").mousewheel(function(event){
    var windowHeight = window.innerHeight;
    var currentHeight = $(this).offset().top;
    if(event.deltaY < 0){
      $("html,body").animate({scrollTop: height+windowHeight}, "2000");
    }else{
      $("html,body").animate({scrollTop: height-windowHeight}, "2000");
    }
  })

  /** 键盘翻页事件 **/
  document.onkeydown=function(event){
    var e = event || window.event || arguments.callee.caller.arguments[0];
    var height = window.innerHeight;
    var scrollTop = $("html,body").scrollTop(); //当前item距离屏幕上边的距离
    var index = (scrollTop - (scrollTop % height)) / height; //当前item索引值
    if(e && e.keyCode==38){ // down 键
      $("html,body").animate({scrollTop: scrollTop - (height + scrollTop % height)}, "2000");
    }else if(e && e.keyCode == 40){ // up
      $("html,body").animate({scrollTop: scrollTop + (height - scrollTop % height)}, "2000");
    }
  }

})
/** 翻页函数 **/
function page(e){
  var url = $(e).attr('href');
  var height = $(url).offset().top;
  $("html,body").animate({scrollTop: height}, 1000);
}
