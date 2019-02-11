//$.getJSON("https://powerful-plains-89867.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/27793/2019/02/11/fi", function (data) {



    let date = new Date();
    var formatOptions = { year: 'numeric', month: '2-digit', day: '2-digit' };
    var numericOptions = { weekday: 'short', month: 'numeric', day: 'numeric' };
    var weekdayOptions = { month: 'numeric', day: 'numeric' };
    let weeks = 4; // put back 4
    let currentWeek = 1;
    let id = 0;
    
    while (currentWeek <= weeks){
      if (date.getDay() > 0 && date.getDay() < 6){
        titleDate = date.toLocaleDateString('fi-FI', numericOptions);
        $('tbody').append('<tr id="day'+id+'" class="day"><th scope="row">'+titleDate+'</th></tr>');
        formatted = date.toLocaleDateString('zh-Hans-CN', formatOptions);
        var url = "https://powerful-plains-89867.herokuapp.com/https://www.sodexo.fi/ruokalistat/output/daily_json/27793/"+formatted+"/fi"
        fetchData(url, id);
        id++;
      }
      date.setDate(date.getDate() + 1);
      if (date.getDay() == 0){
        currentWeek++;
      }
    }
    
    function fetchData(url, i) {
        $.getJSON(url).done(function (data) {
            console.log(data);
          if (data.courses.length) {
            $.each(data.courses, function (k, v) {
              $('#day' + i).append('<th id='+k+'></th>');
              $('#day' + i + ' #' + k).append('<p>' + v.title_fi + '</p>');
              if (v.properties) $('#day' + i + ' #' + k).append('<small>' + v.properties + '</small>');
              $('#day' + i).show();
            });
          }
        });
      }