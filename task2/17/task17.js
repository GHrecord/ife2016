/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}
var currentCity = document.getElementById("city-select");

// 生成随机颜色
var getRandomColor = function(){
  return '#'+(Math.random()*0xffffff<<0).toString(16);
}
/**
 * 渲染图表
 */
function renderChart() {
  var chart = document.getElementsByClassName("aqi-chart-wrap")[0];
  var table = " ",
      height,
      date,
      dateClass = "'bar";
  switch (pageState.nowGraTime){
    case "day":dateClass+=" col-d'";break;
    case "month":dateClass+=" col-m'";break;
    case "week":dateClass+=" col-w'";break;
  }
  for(cell in chartData){
    date = cell;
    height = parseInt(chartData[cell]);
    //console.log(date,height);
    table += "<div class="+dateClass+ " style ='height : " + height + "px;background:"+getRandomColor()+" '><span class='details'>日期："+date +"<br/> 空气质量指数："+height+"</span></div>";
  }
  //console.log(table);
  chart.innerHTML = table;
}

// 设置对应数据
function setData(){
  var temp = aqiSourceData[currentCity.value];
  var tempDate,
      sum = 0,i = 0;
  switch (pageState.nowGraTime){
    case "day":dateClass="col-d";
      chartData = temp;
      break;
    case "month":dateClass="col-m";
      var numOfMonth = 0;
      chartData = {};
      for (item in temp){
        tempDate = new Date(item).getMonth();
        sum += temp[item];
        i++;
        //console.log(i);
        if (tempDate != numOfMonth) {
          numOfMonth++;
          chartData["2016-Month"+numOfMonth] = sum/i;
          //console.log(numOfMonth,sum);
          i=0;sum=0;
        }
      }
      if(i!=0) {
          numOfMonth++;
          chartData["2016-Month"+numOfMonth]= sum/i;
      }
      break;
    case "week":dateClass="col-w";
      var numOfWeek = 0;
      chartData = {};
      for (item in temp){
        tempDate = new Date(item).getDay();
        sum += temp[item];
        i++;
        //console.log(i);
        if (tempDate == 6) {
          numOfWeek++;
          chartData["2016-week"+numOfWeek] = sum/i;
          //console.log(numOfWeek,sum);
          i=0;sum=0;
        }
      }
      if(i!=0) {
          numOfWeek++;
          chartData["2016-week"+numOfWeek]= sum/i;
      }
      break;
  }
  temp = {};
}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange(event) {
  // 确定是否选项发生了变化 
  //console.log(event.target.nodeName);
  if (event.target.nodeName != "INPUT") return;
  if (event.target.value != pageState.nowGraTime) {
    pageState.nowGraTime = event.target.value;
  }

  // 设置对应数据
  setData();
  // 调用图表渲染函数
  renderChart();
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  //console.log(event.target.selectedIndex);
  if (event.target.selectedIndex != pageState.nowSelectCity) {
    pageState.nowSelectCity = event.target.selectedIndex;
  }
  // 设置对应数据

  setData();
  
  // 调用图表渲染函数
  //console.log(chartData);
  renderChart();
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
 document.getElementById("form-gra-time").addEventListener("click",graTimeChange,false);
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var selectCityList = "";
  var citySelect = document.getElementById("city-select");
  for(city in aqiSourceData){
    selectCityList += "<option>"+city+"</option>";
  }
  //console.log(selectCityList);
  citySelect.innerHTML = selectCityList;

  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  document.getElementById("city-select").addEventListener("change",citySelectChange,false);
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  chartData = aqiSourceData[currentCity.value];
  renderChart();
}

//处理鼠标事件，显示和隐藏单元信息
function initDetailDisplay(){
  var detail = document.getElementsByClassName("aqi-chart-wrap")[0];
  detail.addEventListener("mouseover",function(e){
    if (e.target.classList.contains("bar")) {
      e.target.firstChild.style.visibility='visible';
      console.log(e.target.className);
    }
    console.log(e.target.className);
  },false);
  detail.addEventListener("mouseout",function(e){
    if (e.target.classList.contains("bar")) {
      e.target.firstChild.style.visibility='hidden';
      console.log(e.target.className);
    }
    console.log(e.target.className);
  },false);
}
/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  initDetailDisplay();
}

init();