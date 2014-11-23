define(['jquery'],function($){
	var __counter = 0;
	var __userChance = 0;
	var __computerChance = 0;
	var __mainArray;
	function createArray(){
		var arr = [];
		if(arguments.length>0){
			Array.prototype.forEach.call(arguments,function(i){
				arr.push(i);
			});
		}
		return arr;
	}
	function createGameMatrix(){
		var row1 = createArray(0,0,0);
		var row2 = createArray(0,0,0);
		var row3 = createArray(0,0,0);
		__mainArray = createArray(row1,row2,row3);
	}
	function putACross(column){
		var cross = $('.cross').eq(0).clone(true);
		$(column).append(cross);
		$(cross).removeClass('hideMark');
		//$('td').trigger("putADot");
		__counter++;
		__userChance++;
	}
	function fillMatrixWithMove(column,row){
		__mainArray[row][column] = 1;
		console.log("till now main array is",__mainArray);
	}
	function findColumn(column,row){
		var currentRow = $('tbody').children().eq(row);
		console.log('row'+currentRow);
		var currentColumn = $(currentRow).children().eq(column);
		console.log('column'+currentColumn);
		return currentColumn;
	}
	function putADot(column){
		var dot = $('.dot').eq(0).clone(true);
		setTimeout(function(){
			$(column).append(dot);
		},500);
		$(dot).removeClass('hideMark');
		__counter++;
	}
	function forkTheDot(){
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var flag = 0;
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows%2==0 && cols%2==0){
					if(__mainArray[rows][cols] == 0){
						var column = findColumn(cols,rows);
						putADot(column);
						flag = 1;
						break;
					}
				}
			}
			if(flag == 1){
				break;
			}
		}
	}
	function findCrossInRow(){
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var counterInRow =0;
			var flag = 0;
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows==cols){
					if(__mainArray[rows][cols]==1){
						if(counterInRow>0){
							for(var col=0,innerArrayLength = __mainArray[rows].length; col<innerArrayLength ; col++){
								if(__mainArray[rows][col]==0){
									var column = findColumn(col,rows);
									putADot(column);
									flag = 1;
									break;
								}
							}
						}
						counterInRow++;
					}
				}
				if(flag ==1){
					break;
				}
			}
			if(flag ==1){
					break;
			}
		}
	}
	function calculateComputerMove(){
		if(__userChance==1){
			forkTheDot();
			__computerChance++;
		}
		else{
			findCrossInRow();
		}
	}
	function addEventListenersForMatrix(){
		$('td').on('click',function(event){
			if(__counter%2==0){
				var clickedColumn = $(this);
				var column = clickedColumn.parent().children().index(clickedColumn);
				var row = clickedColumn.parent().parent().children().index(clickedColumn.parent());
				putACross(clickedColumn);
				fillMatrixWithMove(column,row);
				calculateComputerMove();
			}
			else{
				alert("its computer's turn baby!");
			}
		});
		/*$('td').on("putADot",function(){
			console.log($(this));
			//alert("kindly put a dot");
		})*/
	}
	return{
		createGameMatrix : createGameMatrix(),
		addEventListenersForMatrix : addEventListenersForMatrix()
	}
});