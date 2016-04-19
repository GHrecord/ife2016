// 生成随机颜色
var getRandomColor = function(){
  return '#'+(Math.random()*0xffffff<<0).toString(16);
}
var getColor = function(hei){
	var color = '';
	//console.log(hei);
	switch (true){
		case hei>400 :
			color = "#832090";
			break;
		case hei>300 :
		  color = "#005db1";
		  break;
		case hei>200 :
		  color = "#73832a";
		  break;
		case hei>100 :
		  color = "#a02730";
		  break;
		case hei>50 :
		  color = "#538289";
		 	break;
		case hei>0 :
		  color = "#10193a";
		  break;
	}
	//console.log(color);
	return color;
}
var randomData = [],
		randomDataHTML ="";
for (var i = 0; i < 50; i++) {
	randomData[i] =  Math.ceil(Math.random() * 100);
	randomDataHTML += "<div class='element' style ='height : "+ randomData[i]*5 + "px;background:"+getColor(randomData[i]*5)+" '><span class='details'>"+randomData[i]+"</span></div>";
}

var elementWrap = document.getElementsByClassName("elementWrap")[0];
elementWrap.innerHTML=randomDataHTML;

var colorStatus;
function paint(data,dataHTML/*,colorStatus*/){
	var bkColor,height;
	for (var i = 0; i < data.length; i++) {
		if(typeof data[i] == 'object'){
			bkColor = data[i][1];
			height = data[i][0]*5;
		}else {
			bkColor = getColor(data[i]*5);
			height = data[i]*5;
		}
		dataHTML += "<div class='element' style ='height : "+ height + "px;background:"+bkColor+" '><span class='details'>"+height+"</span></div>";
	}
	elementWrap.innerHTML = dataHTML;
}

var colorArr = [];
function selectionSort(array){
	var arr,temp,tempArr;
	arr = JSON.parse(JSON.stringify(array));
	for (var i = 0; i < arr.length; i++) {
		j = i;
		temp = arr[i];
		for(;j>0&&arr[j-1]>temp;j--){
			tempArr[j] = [arr[j],"#fa1103"];
			arr[j] = arr[j-1];
			tempArr[j-1] = [arr[j-1],"#F7F00D"];
			colorArr.push(JSON.parse(JSON.stringify(tempArr)) );
		}

		tempArr = JSON.parse(JSON.stringify(arr));
		arr[j] = temp;
		colorArr.push(JSON.parse(JSON.stringify(tempArr)) );
		//console.log(arr);
	}
}

function bubbleSort(array){
	var arr = JSON.parse(JSON.stringify(array)),
			temp,
			tempArr=[];
	for (var i = 0; i < arr.length; i++) {
		for (var j = 0; j < arr.length-i-1; j++) {
			tempArr = JSON.parse(JSON.stringify(arr));
			tempArr[j] = [arr[j],"#fa1103"];
			if(arr[j]>arr[j+1]){
				temp = arr[j];
				arr[j] = arr[j+1];
				arr[j+1] = temp;
				//tempArr[j+1] = [arr[j+1],"#F7F00D"];
				colorArr.push(JSON.parse(JSON.stringify(tempArr)) );
			}
		}
		colorArr.push(JSON.parse(JSON.stringify(tempArr)) );
	}
}

function quickSort(array){
	if (array.length<=1) {return array;}
	var pivotIndex = Math.floor(array.length/2),
			pivot = array.splice(pivotIndex,1)[0],
			left = [],
			right = [],
			tempArr = JSON.parse(JSON.stringify(array));	
	for (var i = 0; i < array.length; i++) {
		if (array[i] <pivot) {
			left.push(array[i]);
		}else{
			right.push(array[i]);
		}
		//tempArr[i] = [array[i],"#fa1103"];
		//colorArr.push(JSON.parse(JSON.stringify(tempArr)) );
	}
	colorArr.push([].concat(quickSort(left),[pivot],quickSort(right)));
	//return quickSort(left).concat([pivot],quickSort(right));
}

function showWithTimeout(){
	for(let i=0;i<colorArr.length;i++){
			setTimeout(function (){
				paint(colorArr[i],'');
				//console.log(i);
			},100*i);
		}
}

document.getElementsByClassName("sortType")[0].addEventListener("click",function(e){
	if (e.target.type == 'radio') {
		if (e.target.value =="insertionSort") {
			selectionSort(randomData);
			showWithTimeout();
		}else if (e.target.value =="bubbleSort") {
			bubbleSort(randomData);
			showWithTimeout();
		}else if (e.target.value =="quickSort") {
			quickSort(JSON.parse(JSON.stringify(randomData)));
			showWithTimeout();
		}
		console.log(randomData);
		//setTimeout("paint("+arr+",' ','#bcf003')",100);
	}
},false);

