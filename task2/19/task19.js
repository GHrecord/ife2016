// 生成随机颜色
var getRandomColor = function(){
  return '#'+(Math.random()*0xffffff<<0).toString(16);
}
var randomData = [],
		randomDataHTML ="";
for (var i = 0; i < 50; i++) {
	randomData[i] =  Math.ceil(Math.random() * 100);
	randomDataHTML += "<div class='element' style ='height : "+ randomData[i]*5 + "px;background:"+getRandomColor()+" '><span class='details'>"+randomData[i]+"</span></div>";
}
var elementWrap = document.getElementsByClassName("elementWrap")[0];
elementWrap.innerHTML=randomDataHTML;

var colorStatus;
function paint(data,dataHTML,colorStatus){
	for (var i = 0; i < data.length; i++) {
		dataHTML += "<div class='element' style ='height : "+ data[i]*5 + "px;background:"+colorStatus+" '><span class='details'>"+data[i]+"</span></div>";
	}
	elementWrap.innerHTML = dataHTML;
}

function selectionSort(arr){
	var jarr,temp;
	for (var i = 1; i < arr.length; i++) {
		
		j = i;
		temp = arr[i];
		//while(j>0&&arr[j-1]>temp)
		for(;j>0&&arr[j-1]>temp;j--){
			
			arr[j] = arr[j-1];
			//j--;
			(function(){
				setTimeout(paint(arr,'','#e84664'),10);})();
			
		}
		arr[j] = temp;
		(function(){setTimeout(paint(arr,'','#bcf003'),100);})();
		//setTimeout("paint(randomData,'','#bcf003')",100);
		//setTimeout(alert("000"),100);
		
	}
}

document.getElementsByClassName("sortType")[0].addEventListener("click",function(e){
	if (e.target.type == 'radio') {
		selectionSort(randomData);
		//paint(randomData,,'#bcf003');
	}
},false);