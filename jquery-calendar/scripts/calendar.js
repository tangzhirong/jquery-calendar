/**
 * Created by tzr4032369 on 2016/9/13.
 */

if(typeof jQuery == 'undefined'){
    throw new Error('jQuery is not loaded!');
}

//定义日历组件对象，并挂载到jquery全局作用域中
$.fn.calendar = function(options){
    //合并日历默认设置
    var opts = $.extend({}, $.fn.calendar_defaults(),options);
    //绘制日历
    drawCalendar(opts);

    //定义绘制日历方法
    function drawCalendar(opts){
        //创建承载日历的table
        var borderClass = (opts.cell_border === true) ? 'table-bordered' : '';
        var tableObj = $('<table class="table'+' '+borderClass+'"></table>');
        var tbody = $('<tbody></tbody>');
        tbody.appendTo(tableObj);

        //获取当前时间对象
        var nowObj = {
            year:opts.year,
            month:opts.month,
            date:opts.date
        }
        //绘制当前日期
        drawTodayHeader(opts,nowObj,tbody);

        //绘制年月份
        drawMonthHeader(opts,nowObj,tbody);

        //绘制星期几
        drawWeekHeader(opts,tbody);

        //绘制当月所有日期
        drawDayContent(opts,nowObj,tbody);

        //将日历渲染到页面
        var cal = $('#my-calendar');
        tableObj.appendTo(cal);

        //添加自定义皮肤
        if(opts.styleClass){
            addStyle(opts);
        }

    }

    //绘制当前日期
    function drawTodayHeader(opts,nowObj,tbody){
        if(opts.show_today){
            var todayHeader = $('<tr class="today-header info"><th class="logo"></th><th colspan="5">'+nowObj.year+'年'+nowObj.month+'月'+nowObj.date+'日'+'</th><th></th></tr>');
            todayHeader.appendTo(tbody);
        }
    }

    //绘制年月份
    function drawMonthHeader(opts,nowObj,tbody){
        var pre = $('<th><span id="preMonth">'+'<'+'</span></th>');
        var next = $('<th><span id="nextMonth">'+'>'+'</span></th>');
        var monthText = $('<th colspan="5" id="monthText">'+nowObj.year+'年'+nowObj.month+'月'+'</th>');
        var monthHeader = $('<tr class="month-header active"></tr>');
        pre.appendTo(monthHeader);
        monthText.appendTo(monthHeader);
        next.appendTo(monthHeader);

        //为向前翻月与向后翻月绑定事件
        pre.on('click',function(){
            $('#monthText').html(getPreTime(nowObj.year,nowObj.month).year+'年'+getPreTime(nowObj.year,nowObj.month).month+'月');
            $('.day-content').each(function(){
                $(this).remove();
            })
            drawDayContent(opts,getPreTime(nowObj.year,nowObj.month),tbody);
            //更新nowObj
            nowObj.year = getPreTime(nowObj.year,nowObj.month).year;
            nowObj.month = getPreTime(nowObj.year,nowObj.month).month;

        });
        next.on('click',function(){
            $('#monthText').html(getNextTime(nowObj.year,nowObj.month).year+'年'+getNextTime(nowObj.year,nowObj.month).month+'月');
            $('.day-content').each(function(){
                $(this).remove();
            })
            drawDayContent(opts,getNextTime(nowObj.year,nowObj.month),tbody);
            //更新nowObj
            nowObj.year = getNextTime(nowObj.year,nowObj.month).year;
            nowObj.month = getNextTime(nowObj.year,nowObj.month).month;
        });
        monthHeader.appendTo(tbody);



    }

    ///绘制星期几
    function drawWeekHeader(opts,tbody){
        if(opts.show_days){
            var weekHeader = $('<tr class="week-header success"><th>一</th><th>二</th><th>三</th><th>四</th><th>五</th><th>六</th><th>日</th></tr>');
            weekHeader.appendTo(tbody);
        }
    }

    //绘制当月所有日期
    function drawDayContent(opts,nowObj,tbody){
        var daysOfMonth = getMonthDays(nowObj.year,nowObj.month-1);
        var firstDay = new Date(nowObj.year,nowObj.month-1,1).getDay();
        console.log(daysOfMonth,firstDay);
        //0代表星期日
        if(firstDay == 0){
            firstDay =7;
        }
        var dayNum = 0;  //记录该月所有单元格数
        var days = 0;  //记录有日期的单元格数
        do{
            var dowLine = $('<tr class="day-content"></tr>');
            for(var i=0;i<7;i++){
                var dowTd = $('<td></td>');
                //允许通过点击来选中任一日期
                dowTd.on('click',function(){
                    $('.mark_choose').removeClass('mark_choose');
                    $(this).addClass('mark_choose');
                })
                dayNum++;
                if(dayNum >= firstDay && days<daysOfMonth){
                    days++;
                    //双击事件绑定
                    dowTd.on('dblclick',function(num){
                        return function(){
                            $('.mark_choose').removeClass('mark_choose');
                            if(confirm("确定选择日期："+nowObj.year+"年"+nowObj.month+"月"+num+"日？")){
                                $('.mark_confirm').removeClass('mark_confirm');
                                $(this).addClass('mark_confirm');
                            }
                            //在此读出选择日期

                        }
                    }(days))
                    //判断日期,标注今天
                    if(opts.today && nowObj.year == opts.year && nowObj.month == opts.month && days == opts.date){
                        dowTd.addClass('mark_today');
                    }
                    dowTd.html(days);
                }
                dowTd.appendTo(dowLine);
            }
            dowLine.appendTo(tbody);
        }while(days<daysOfMonth);

        //重新渲染后，补充日期内容栏定制皮肤类
        $('.day-content').addClass(opts.styleClass+'_content');
    }

    //添加自定义皮肤
    function addStyle(opts){
        $('.today-header').removeClass('info');
        $('.today-header').addClass(opts.styleClass+'_today');
        $('.month-header').removeClass('active');
        $('.month-header').addClass(opts.styleClass+'_month');
        $('.week-header').removeClass('success');
        $('.week-header').addClass(opts.styleClass+'_week');
        $('.day-content').addClass(opts.styleClass+'_content');
    }
}

//日历默认设置
$.fn.calendar_defaults = function(){
    //获取今天的年月日
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth()+1;
    var date = now.getDate();

    //默认设置
    var settings = {
        year:year,
        month:month,
        date:date,
        cell_border:false,    //是否显示单元格边框
        styleClass:'',      //定制皮肤类名
        show_days:true,     //是否显示星期几这一栏
        show_today:true,    //是否显示今天的日期这一栏
        today:true,      //是否对今天的日期特别标注
    }
    return settings;
}

//获取某年某月的天数
function getMonthDays(year,month){
    var monthStartDate = new Date(year, month, 1);
    var monthEndDate = new Date(year, month+1, 1);
    var days = (monthEndDate - monthStartDate)/(1000 * 60 * 60 * 24);
    return days;
}

//获取上个月的年月
function getPreTime(year,month){
    if(month == 1){
        return {
            year:year-1,
            month:12,
            date:1
        }
    }else{
        return {
            year:year,
            month:month-1,
            date:1
        }
    }
}

//获取下个月的年月
function getNextTime(year,month){
    if(month == 12){
        return {
            year:year+1,
            month:1,
            date:1
        }
    }else{
        return {
            year:year,
            month:month+1,
            date:1
        }
    }
}