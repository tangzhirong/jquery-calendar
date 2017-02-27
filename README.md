# jquery-calendar
一个基于jquery、bootstrap的可自定义样式的日历组件
![image](https://github.com/tangzhirong/jquery-calendar/blob/master/demo1.png)

### 支持日期选择
 ![image](https://github.com/tangzhirong/jquery-calendar/blob/master/demo2.png)
 ![image](https://github.com/tangzhirong/jquery-calendar/blob/master/demo3.png)
 
### 支持皮肤定制
 ![image](https://github.com/tangzhirong/jquery-calendar/blob/master/demo4.png)
 
### 支持可选日历属性

Usage
=======================
### html：
  在需要添加日历组件的父元素中添加“id=my-calendar”属性即可，在calendar构造器中传入自选参数：
### 
    <div class="col-md-6" id="my-calendar">
                <script>
                    $(document).ready(function(){
                       $('#my-calendar').calendar({
                           cell_border:false,    //不显示单元格边框
                           styleClass:'zidingyi',      //定制皮肤类名
                           show_days:true,     //显示星期几这一栏
                           show_today:true,    //显示今天的日期这一栏
                           today:true,      //对今天的日期特别标注
                        });
                    })
                </script>
     </div>
   
### css：
  可定制自定义皮肤，类名为styleClass+‘_日历部位’：
  
###
    /**********定制自定义皮肤**********/
    .zidingyi_today {
      background-color: #269abc;
      color: white;
    }

    .zidingyi_month{
      background-color: #afd9ee;
      color: #080808;
    }

    .zidingyi_week{
      background-color: #269abc;
      color: #080808;
    }

    .zidingyi_content{
      background-color: #afd9ee;
      color: #080808;
    }
   
