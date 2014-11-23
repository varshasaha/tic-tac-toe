define(['jquery'],function($){
	var __counter = 0;
	var __userChance = 0;
	var __computerChance = 0;
	var __mainArray;
	var __computerArray=[];
	var __userArray=[];
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
		if(__counter==4){
			//alert("from user");
			$(document).trigger("findWinner");
		}
	}
	function fillMatrixWithMove(column,row){
		__mainArray[row][column] = 1;
		console.log("till now main array is",__mainArray);
	}
	function fillMatrixWithComputerMove(column,row){
		__mainArray[row][column] = 2;
		//alert("filling matrix");
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
		//setTimeout(function(){
			$(column).append(dot);
		$(dot).removeClass('hideMark');
		__counter++;
		__computerChance++;
	}
	function forkTheDot(){
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var flag = 0;
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows%2==0 && cols%2==0){
					if(__mainArray[rows][cols] == 0){
						var column = findColumn(cols,rows);
						putADot(column);
						fillMatrixWithComputerMove(cols,rows);
						//alert("counter "+__counter);
						if(__counter>=4){
								//alert("from computer");
								$(document).trigger("findWinner");
						}
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
	function findCrossInRow(val){
		var notInARow = 0;
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var flag = 0;
			var counterInRow = 0;
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(__mainArray[rows][cols]==val){
					//alert("at "+rows+" "+cols);
					if(counterInRow == 1){
						for(var col=0,length = __mainArray[rows].length; col<length ; col++){
							if(__mainArray[rows][col]==0){
								var column = findColumn(col,rows);
								//alert("column");
								putADot(column);
								fillMatrixWithComputerMove(col,rows);
								//alert("counter "+__counter);
								if(__counter>=4){
									//alert("from computer");
									$(document).trigger("findWinner");
								}
								flag = 1;
								break;
							}
						}
						counterInRow++;
					}
					else{
						counterInRow++;
						continue;
					}
				}
				if(flag==1){
					break;
				}
			}
			if(flag==1){
				notInARow = 1;
				break;
			}
		}
		return notInARow;
	}
	function findCrossInColumn(val){
		var notInACol = 0;
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var counterInCol = 0;
			var flag = 0;
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(__mainArray[cols][rows]==val){
					if(counterInCol == 1){
						for(var col=0,length = __mainArray[rows].length; col<length ; col++){
							if(__mainArray[col][rows]==0){
								var column = findColumn(rows,col);
								putADot(column);
								flag = 1;
								fillMatrixWithComputerMove(rows,col);
								//alert("counter "+__counter);
								if(__counter>=4){
									//alert("from computer");
									$(document).trigger("findWinner");
								}
								break;
							}
						}
						counterInCol++;
					}
					else{
						counterInCol++;
					}
				}
				if(flag==1){
					break;
				}
			}
			if(flag==1){
				notInACol = 1;
				break;
			}
		}
		return notInACol;
	}
	function findCrossInADiagonal(val){
		var counterInDiag = 0;
		var flag = 0;
		var notInADiag =0;
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows==cols){
					if(__mainArray[rows][cols]==val){
						if(counterInDiag==1){
							for(var row=0,length = __mainArray.length; row<length ; row++){
								for(var col=0,colLength = __mainArray[row].length; col<colLength ; col++){
									if(row==col){
										if(__mainArray[row][col]==0){
											var column = findColumn(row,col);
											putADot(column);
											flag = 1;
											fillMatrixWithComputerMove(col,row);
											//alert("counter "+__counter);
											if(__counter>=4){
												//alert("from computer");
												$(document).trigger("findWinner");
											}
											break;
										}
									}
								}
								if(flag==1){
									break;
								}
							}
							
						}
						counterInDiag++;
					}
				}
				if(flag==1){
					break;
				}
			}
			if(flag==1){
				notInADiag =1;
				break;
			}
		}
		return notInADiag;
	}
	function findCrossInRightDiagonal(val){
		var counterInDiag = 0;
		var flag = 0;
		var notInADiag =0;
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows+cols==__mainArray.length-1){
					if(__mainArray[rows][cols]==val){
						if(counterInDiag==1){
							for(var row=0,length = __mainArray.length; row<length ; row++){
								for(var col=0,colLength = __mainArray[row].length; col<colLength ; col++){
									if(row+col==__mainArray.length-1){
										if(__mainArray[row][col]==0){
											var column = findColumn(col,row);
											putADot(column);
											flag = 1;
											fillMatrixWithComputerMove(col,row);
											//alert("counter "+__counter);
											if(__counter>=4){
												//alert("from computer");
												$(document).trigger("findWinner");
											}
											break;
										}
									}
								}
								if(flag==1){
									break;
								}
							}
							
						}
						counterInDiag++;
					}
				}
				if(flag==1){
					break;
				}
			}
			if(flag==1){
				notInADiag =1;
				break;
			}
		}
		return notInADiag;
	}
	function markComputerMoveInCenter(){
		var marked = 0;
		if(__mainArray[1][1]==0){
			var column = findColumn(1,1);
			putADot(column);
			fillMatrixWithComputerMove(1,1);
			//alert("counter "+__counter);
			if(__counter>=4){
				//alert("from computer");
				$(document).trigger("findWinner")
			}
			marked = 1;
		}
		return marked;
	}
	function markRandomComputerMove(){
	//alert("random move");
		var rows = __mainArray.length;
		var cols = __mainArray[0].length;
		var row = Math.floor(Math.random() * rows);
		var col = Math.floor(Math.random() * cols);
		if(__mainArray[row][col]==0){
			//alert()
			var column = findColumn(col,row);
			putADot(column);
			fillMatrixWithComputerMove(col,row);
			//alert("counter "+__counter);
			if(__counter>=4){
				//alert("from computer");
				$(document).trigger("findWinner");
			}
		}
		else{
			markRandomComputerMove();
		}
	}
	function playToWin(){
			var inARow = findCrossInRow(2);
			var inAColumn = 0, inADiagonal =0, isRightDiagonal = 0;
			if(inARow==0){
				//alert("no row");
				inAColumn = findCrossInColumn(2);
				if(inAColumn==0){
					//alert("no column");
					inADiagonal = findCrossInADiagonal(2);
					if(inADiagonal==0){
						//alert("no left");
						isRightDiagonal = findCrossInRightDiagonal(2);
					}
				}
				else{
					//alert("yes column");
				}
			}
			if(inARow==0&&inAColumn==0&&inADiagonal==0&&isRightDiagonal==0){
				//alert("no anything");
				return 0;
			}
			return 1;
	}
	function calculateComputerMove(){
		if(__userChance==1){
			var mark = markComputerMoveInCenter();
			if(!mark){
				forkTheDot();
			}
			__computerChance++;
		}
		else{
			var playWin = playToWin();
			if(!playWin){
			//alert("doesnt wanna win");
			var inARow = findCrossInRow(1);
			var inAColumn = 0, inADiagonal =0, isRightDiagonal = 0;
			if(inARow==0){
			//alert("no row");
				inAColumn = findCrossInColumn(1);
				
				if(inAColumn==0){
				//alert("no column");
					inADiagonal = findCrossInADiagonal(1);
					
					if(inADiagonal==0){
						//alert("no left");
						isRightDiagonal = findCrossInRightDiagonal(1);
						if(isRightDiagonal==0){
							//alert("no right");
							markRandomComputerMove();
						}
					}
				}
			}	
			}
		}
		//$(document).trigger("findWinner");
	}
	function checkIfFreeCellsExist(){
		var flag = 0;
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(__mainArray[rows][cols]==0){
					flag=1;
					break;
				}
			}
			if(flag==1){
				break;
			}
		}
		if(flag==1){
			return 1;
		}
		return 0;
	}
	function checkIfCellAlreadyFilled(col,row){
		if(__mainArray[row][col]==0){
			return 0;
		}
		return 1;
	}
	function strikeInARow(){
		//alert("checking strike in a row");
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			var userInARow=0;
			var computerInARow=0;
			__computerArray=[];
			__userArray=[];
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				//alert('yo'+computerInARow);
				
				if(__mainArray[rows][cols]==1){
					//alert("user rows"+rows+" "+cols+" "+userInARow);
					var col = findColumn(cols,rows);
					__userArray.push(col);
					++userInARow;
				}
				else if(__mainArray[rows][cols]==2){
					var col = findColumn(cols,rows);
					__computerArray.push(col);
					//console.log("yo bitch",__computerArray);
					++computerInARow;
				}
				if(computerInARow == 3){
				console.log("yo bitch",__computerArray);
					return 2;
				}
				if(userInARow == 3){
					return 1;
				}
			}
		}
		return 0;
	}
	function strikeInAColumn(){
		for(var cols=0,arrayLength = __mainArray[0].length; cols<arrayLength ; cols++){
			var userInACol=0;
			var computerInACol=0;
			__computerArray=[];
			__userArray=[];
			for(var rows=0,innerArrayLength = __mainArray.length; rows<innerArrayLength ; rows++){
				
				if(__mainArray[rows][cols]==1){
					++userInACol;
					var col = findColumn(cols,rows);
					__userArray.push(col);
				}
				else if(__mainArray[rows][cols]==2){
					++computerInACol;
					var col = findColumn(cols,rows);
					__computerArray.push(col);
				}
				if(computerInACol == 3){
					return 2;
				}
				if(userInACol == 3){
					return 1;
				}
			}
		}
		return 0;
	}
	function strikeInLeftDiagonal(){
		var userInARow=0;
		var computerInARow=0;
		__computerArray=[];
		__userArray=[];
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows==cols){
					
					if(__mainArray[rows][cols]==1){
						//alert("user"+" "+rows+" "+cols+" "+userInARow);
						++userInARow;
						var col = findColumn(cols,rows);
						__userArray.push(col);
					}
					else if(__mainArray[rows][cols]==2){
						//alert("computer"+" "+rows+" "+cols+" "+computerInARow);
						++computerInARow;
						var col = findColumn(cols,rows);
						__computerArray.push(col);
					}
					if(computerInARow == 3){
						return 2;
					}
					if(userInARow == 3){
						return 1;
					}
				}
			}
		}
		return 0;
	}
	function strikeInRightDiagonal(){
		var userInARow=0;
		var computerInARow=0;
		__computerArray=[];
		__userArray=[];
		for(var rows=0,arrayLength = __mainArray.length; rows<arrayLength ; rows++){
			for(var cols=0,innerArrayLength = __mainArray[rows].length; cols<innerArrayLength ; cols++){
				if(rows+cols==__mainArray.length-1){
					
					if(__mainArray[rows][cols]==1){
						++userInARow;
						var col = findColumn(cols,rows);
						__userArray.push(col);
					}
					else if(__mainArray[rows][cols]==2){
						++computerInARow;
						var col = findColumn(cols,rows);
						__computerArray.push(col);
					}
					if(computerInARow == 3){
						return 2;
					}
					if(userInARow == 3){
						return 1;
					}
				}
			}
		}

		return 0;
	}
	function highlightStrike(array,player){
		for(var ii=0;ii<array.length;ii++){
			$(array[ii]).addClass('highlight');
		}
		var winner = $('#winner');
		winner.removeClass('hideMark');
		if(player=="You"){
			winner.children().eq(0).text("Congratulations, " +player+" win!");
		}
		else if(player=="Computer"){
			winner.children().eq(0).text("Looks like you cannot surpass " +player+"'s intellect!");
		}
		else{
			winner.children().eq(0).text("No Losers here , its a " +player);
		}
	}
	function addEventListenersForMatrix(){
		$('td').on('click',function(event){
				if(__counter%2==0){
					var clickedColumn = $(this);
					var column = clickedColumn.parent().children().index(clickedColumn);
					var row = clickedColumn.parent().parent().children().index(clickedColumn.parent());
					if(!checkIfCellAlreadyFilled(column,row)){
						putACross(clickedColumn);
						fillMatrixWithMove(column,row);
						if(checkIfFreeCellsExist()){
							calculateComputerMove();
						}
						else{
							highlightStrike([],"Draw");
						}
					}
				}
				else{
					alert("its computer's turn baby!");
				}
			
		});
		$(document).on("findWinner",function(){
			var rowCracker = strikeInARow();
			//alert(rowCracker);
			if(rowCracker){
				if(rowCracker==1){
					highlightStrike(__userArray,"You");
				}
				else if(rowCracker==2){
					highlightStrike(__computerArray,"Computer");
				}
				$(document).off("findWinner");
				$('td').off("click");
			}
			var columnCracker = strikeInAColumn();
			if(columnCracker){
				if(columnCracker==1){
					highlightStrike(__userArray,"You");
				}
				else if(columnCracker==2){
					highlightStrike(__computerArray,"Computer");
				}
				$(document).off("findWinner");
				$('td').off("click");
			}
			var leftDiagonal = strikeInLeftDiagonal();
			if(leftDiagonal){
				if(leftDiagonal==1){
					highlightStrike(__userArray,"You");
				}
				else if(leftDiagonal==2){
					highlightStrike(__computerArray,"Computer");
				}
				$(document).off("findWinner");
				$('td').off("click");
			}
			var rightDiagonal = strikeInRightDiagonal();
			if(rightDiagonal){
				if(rightDiagonal==1){
					highlightStrike(__userArray,"You");
				}
				else if(rightDiagonal==2){
					highlightStrike(__computerArray,"Computer");
				}
				$(document).off("findWinner");
				$('td').off("click");
			}
		})
	}
	return{
		createGameMatrix : createGameMatrix(),
		addEventListenersForMatrix : addEventListenersForMatrix()
	}
});