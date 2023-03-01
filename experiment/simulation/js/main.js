var p=Math.floor(Math.random()*(10));

//Declare a global variable
let ring;

var flag=true;
var itv = 0;
var qCount = 0;
let qCounts=0;
let qCont=0;
let qConts=0;
var inferenceData = [["<10","10-20","20-30",">30"],
						["Exceptionally Strong","Strong","Satisfactory for road surfacing","Weak for road surfacing"]]
var inCount = 0;
let index = 0; //First Table 
let indx=0;//Second Table 
let attempt = 0; // Initialize the attempt counter
let indexx=0;
let indexxx=0;

let tableData = [  [2, 100, 92, 8,],
[3, 100, 93, 7,],
  [5, 100, 89, 11, ],
  [10, 100, 84, 16, ],
  [10, 100, 89, 11, ],
  [10, 100, 95, 5, ],
  [20, 100, 92, 8, ],
  [20, 100, 92, 8, ],
];
let secondTableData = [  
	[4, 8],
	[2.33,15], 
	[2.20, 26],
	[1.60, 42],
	[1.10, 53],
	[0.50, 58],
	[0.40, 66],
	[0.40, 77],
	  
];

let thirdTableData =[ [2, 100, 93, 7,],
[3, 100, 92, 8,],
[5, 100, 89, 10,],
[10, 100, 84, 14,],
[10, 100, 93, 7,],
[10, 100, 96, 4,],
[20, 100, 92, 6,],
[20, 100, 92, 6,],

]
let fourthTableData =[ 
[3.50, 7],
[2.67,25],
[2.00, 25],
[1.40,39],
[0.70, 46],
[0.40,50],
[0.3, 56],
[0.3,62],

]
	

function addRow() {
	let tableBody = document.getElementById('tableBody');
	let row = tableData[index];
	let tr = document.createElement('tr');
  
	for (let i = 0; i < 4; i++) {
	  let td = document.createElement('td');
	  td.innerHTML = row[i];
	  tr.appendChild(td);
	}
  
	tableBody.appendChild(tr);
	index++;

	 if (index < tableData.length) {
	  setTimeout(addRow, 1000);
	}
}


function addSecondTable() {
	let tableBody = document.getElementById('secondTableBody');
	let row = tableData[indx];
	let tr = document.createElement('tr');
	for (let i = 0; i < 6; i++) {
	  let td = document.createElement('td');
	  let inputBox = document.createElement('input')
	  inputBox.classList.add("input-table")
	  inputBox.setAttribute("id", "row_" + indx + "_col_" + i); // Set id attribute
	  
	  // Remove onchange attribute from input boxes
	  inputBox.removeAttribute("onchange");

	  
	  if(i == 4 || i == 5){
		td.appendChild(inputBox)
	  } else {
		td.innerHTML = row[i]
	  }
	  tr.appendChild(td);

	  // Set input box color to black
	  inputBox.style.color = "black";
	  inputBox.style.textAlign="center"
	}
  
	tableBody.appendChild(tr);
	indx++;
  
	if (indx < tableData.length) {
	  setTimeout(addSecondTable);
	}
	
}
let valuesEntered=0;

function checkInputs() {
	let inputBoxes = document.querySelectorAll('#secondTableBody input');
	let spanElement = document.getElementById('inputError');
	console.log(`Found ${inputBoxes.length} input boxes`);
  
	// Check if any input boxes have no value entered
	let emptyBoxes = Array.from(inputBoxes).filter((inputBox) => !inputBox.value.trim());
	if (emptyBoxes.length > 0) {
	  if (attempt === 0) {
		spanElement.textContent = 'Please enter the values';
		console.log('Some input boxes have no value entered');
		return;
	  } else {
		spanElement.textContent = '';
	  }
	} else {
	  spanElement.textContent = '';
	}
  
	for (let i = 0; i < inputBoxes.length; i++) {
	  let inputBox = inputBoxes[i];
	  let row = inputBox.parentNode.parentNode;
	  let rowIndex = row.rowIndex-2;
	  let colIndex = inputBox.parentNode.cellIndex;
	  let value = parseFloat(inputBox.value);
	  let expectedValue = secondTableData[rowIndex][colIndex-4];
	  if (value === expectedValue) {
		inputBox.style.color = "green";
		inputBox.style.textAlign = 'center';
	  } else {
		inputBox.style.color = "red";
		inputBox.style.textAlign = 'center';
  
	  }
	}
	console.log('Checked input boxes');
  
	// After the second attempt, allow the user to correct any incorrect answers
	if (attempt === 1) {
	  console.log('Second attempt!');
	  let inputBoxes = document.querySelectorAll('#secondTableBody input');
	  for (let i = 0; i < inputBoxes.length; i++) {
		let inputBox = inputBoxes[i];
		let row = inputBox.parentNode.parentNode;
		let rowIndex = row.rowIndex-2;
		let colIndex = inputBox.parentNode.cellIndex;
		let value = parseFloat(inputBox.value);
		let expectedValue = secondTableData[rowIndex][colIndex-4];
		if (value !== expectedValue) {
		  inputBox.disabled = false;
		  console.log(`Enabled input box at row ${rowIndex}, column ${colIndex}`);
		}
  
	  }
	}
	// Increment the attempt counter
	attempt++;
	console.log(`Attempt: ${attempt}`);
  
	// After the third attempt, show the results button
	if (attempt === 2) {
	  console.log('Third attempt!');
	  let resultsButton = document.getElementById('resultBtn');
	  resultsButton.style.visibility = 'visible';
	  console.log('Results button displayed!');
	}
  }
  

//Result function

function showResults() {
	let table = document.getElementById('mySecondTable');
  	table.style.width = '85%';
	table.style.height ='280px';
	let tableBody = document.getElementById('secondTableBody');
	let rows = tableBody.getElementsByTagName('tr');
  
	// Hide the input fields in the second and third columns
	let inputFields = document.querySelectorAll('#secondTableBody td input');
	for (let i = 0; i < inputFields.length; i++) {
	  inputFields[i].style.display = 'none';
	}
  
	// Hide the last two columns
	let cells = document.querySelectorAll('#secondTableBody td:last-child, #secondTableBody td:nth-last-child(2)');
	for (let i = 0; i < cells.length; i++) {
	  cells[i].style.display = 'none';
	}
  
	// Add the results to the table if they haven't been added before
	let addedClass = 'results-added'; // Define a class name for the added cells
	for (let i = 0; i < secondTableData.length; i++) {
	  let row = secondTableData[i];
	  let tr = rows[i];
	  if (!tr.classList.contains(addedClass)) { // Check if the row has already been modified
		for (let j = 4; j < 6; j++) {
			let td = tr.insertCell(j);
			if (j === 5) {
			  // Round the result to two decimal places
			  td.innerHTML = row[j - 4].toFixed(2);
			} else {
			  td.innerHTML = row[j - 4].toFixed(2);
			}
		  }
		  tr.classList.add(addedClass); // Add the class to the modified row
		}
	}
	
}

//30cm Ring
function addRows() {
	let tableBody = document.getElementById('tabBody');
	let row = thirdTableData[indexx];
	let tr = document.createElement('tr');
  
	for (let i = 0; i < 4; i++) {
	  let td = document.createElement('td');
	  td.innerHTML = row[i];
	  tr.appendChild(td);
	}
  
	tableBody.appendChild(tr);
	indexx++;
  
	 if (indexx < thirdTableData.length) {
	  setTimeout(addRows, 1000);
	}
}
function addFourthTable() {
	let tableBody = document.getElementById('fourthTableBody');
	let row = thirdTableData[indexxx];
	let tr = document.createElement('tr');
	for (let i = 0; i < 6; i++) {
	  let td = document.createElement('td');
	  let inputBox = document.createElement('input')
	  inputBox.classList.add("input-table")
	  inputBox.setAttribute("id", "row_" + indexxx + "_col_" + i); // Set id attribute
	  
	  // Remove onchange attribute from input boxes
	  inputBox.removeAttribute("onchange");

	  
	  if(i == 4 || i == 5){
		td.appendChild(inputBox)
	  } else {
		td.innerHTML = row[i]
	  }
	  tr.appendChild(td);

	  // Set input box color to black
	  inputBox.style.color = "black";
	  inputBox.style.textAlign="center"
	}
  
	tableBody.appendChild(tr);
	indexxx++;
  
	if (indexxx < fourthTableData.length) {
	  setTimeout(addFourthTable, 100);
	}
	
	console.log("Adding row " + indexxx + " to fourth table");
}

function checkValues() {
	let inputBoxes = document.querySelectorAll('#fourthTableBody input');
	let spanElement = document.getElementById('input_Error');
	console.log(`Found ${inputBoxes.length} input boxes`);

	// Check if any input boxes have no value entered
	let emptyBoxes = Array.from(inputBoxes).filter((inputBox) => !inputBox.value.trim());
	if (emptyBoxes.length > 0) {
	  if (attempt === 0) {
		spanElement.textContent = 'Please enter the values';
		console.log('Some input boxes have no value entered');
		return;
	  } else {
		spanElement.textContent = '';
	  }
	} else {
	  spanElement.textContent = '';
	}
	for (let i = 0; i < inputBoxes.length; i++) {
	  let inputBox = inputBoxes[i];
	  let row = inputBox.parentNode.parentNode;
	  let rowIndex = row.rowIndex-2;
	  let colIndex = inputBox.parentNode.cellIndex;
	  let value = parseFloat(inputBox.value);
	  let expectedValue = fourthTableData[rowIndex][colIndex-4];
	  if (value === expectedValue) {
		inputBox.style.color = "green";
		inputBox.style.textAlign = 'center';
	  } else {
		inputBox.style.color = "red";
		inputBox.style.textAlign = 'center';
		
	  }
	}

	// After the second attempt, allow the user to correct any incorrect answers
	if (attempt === 1) {
		console.log('Second attempt!');
		let inputBoxes = document.querySelectorAll('#fourthTableBody input');
		for (let i = 0; i < inputBoxes.length; i++) {
		  let inputBox = inputBoxes[i];
		  let row = inputBox.parentNode.parentNode;
		  let rowIndex = row.rowIndex-2;
		  let colIndex = inputBox.parentNode.cellIndex;
		  let value = parseFloat(inputBox.value);
		  let expectedValue = fourthTableData[rowIndex][colIndex-4];
		  if (value !== expectedValue) {
			inputBox.disabled = false;
			console.log(`Enabled input box at row ${rowIndex}, column ${colIndex}`);
		  }
		  
		}
	}
	// Increment the attempt counter
	attempt++; 
	// After the third attempt, show the results button
	if (attempt === 2) {
		console.log('Third attempt!');
		let resultsButton = document.getElementById('resultButton');
		resultsButton.style.visibility = 'visible';
		console.log('Results button displayed!');
	}
}

function results() {
	let table = document.getElementById('myFourthTable');
  	table.style.width = '85%';
	table.style.height ='280px';
	let tableBody = document.getElementById('fourthTableBody');
	let rows = tableBody.getElementsByTagName('tr');
  
	// Hide the input fields in the second and third columns
	let inputFields = document.querySelectorAll('#fourthTableBody td input');
	for (let i = 0; i < inputFields.length; i++) {
	  inputFields[i].style.display = 'none';
	}
  
	// Hide the last two columns
	let cells = document.querySelectorAll('#fourthTableBody td:last-child, #fourthTableBody td:nth-last-child(2)');
	for (let i = 0; i < cells.length; i++) {
	  cells[i].style.display = 'none';
	}
  
	// Add the results to the table if they haven't been added before
	let addedClass = 'results-added'; // Define a class name for the added cells
	for (let i = 0; i < fourthTableData.length; i++) {
	  let row = fourthTableData[i];
	  let tr = rows[i];
	  if (!tr.classList.contains(addedClass)) { // Check if the row has already been modified
		for (let j = 4; j < 6; j++) {
		  let td = tr.insertCell(j);
		  if (j === 5) {
			// Round the result to two decimal places
			td.innerHTML = row[j - 4].toFixed(2);
		  } else {
			td.innerHTML = row[j - 4].toFixed(2);
		  }
		}
		tr.classList.add(addedClass); // Add the class to the modified row
	  }
	}
  }
  

 

// Prompt questions during simulation using objects
var questions = {
	ans1:0,
	options:[],
	nextFunction:function(){},
	setOptions:function(d1,d2,d3,d4,d5){
		questions.options = new Array(d1,d2,d3,d4,d5);
	},
	setOptions1:function(d1,d2,d3){
		questions.options = new Array(d1,d2,d3);
	},
	setAns:function(ans){
		if(simsubscreennum == 10){
			if(itv < 10){
				questions.ans1 = 1;
				inCount = 0;
			}
			else if(itv > 10 && itv < 20){
				questions.ans1 = 2;
				inCount = 1;
			}
			else if(itv > 20 && itv < 30){
				questions.ans1 = 3;
				inCount = 2;
			}
			else if(itv > 35){
				questions.ans1 = 4;
				inCount = 3;
			}
		}
		else{
			questions.ans1 = ans;
		}
		
	},
	frameQuestions:function(qun){
		var myDiv  = document.getElementById("question-div");
		var myDiv1 = document.getElementById("divq");
		// myDiv.style.visibility = "visible";
		myDiv.style.animation = "blinkingText 1s 1";
		myDiv.style.visibility = "visible";
		myDiv.classList.add("fadeIn");
			document.getElementById("divq").innerHTML = qun;
		//Create and append select list
		var selectList = document.createElement("select");
		selectList.setAttribute("id", "mySelect");
		selectList.setAttribute("autocomplete", "off");
		// selectList.setAttribute("onchange", "questions.setAnswer()");
		
		var button1 = document.createElement("input");
		button1.setAttribute("onclick","questions.setAnswer(this)");
		button1.setAttribute("type","button");
		button1.setAttribute("value","OK");
		button1.setAttribute("style","cursor:pointer");
	
		// Appending the contents to the division
		myDiv1.appendChild(selectList);
		myDiv1.appendChild(button1);

	//Create and append the options
		for (var i = 0; i < questions.options.length; i++) {
			var opt = document.createElement("option");
			opt.setAttribute("value", questions.options[i]);
			opt.text = questions.options[i];
			selectList.appendChild(opt);
		}
	},
	setAnswer:function(ev){
		var x = document.getElementById("mySelect");
		var i = x.selectedIndex;
		if(i == 0)
		{
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You have not selected any value";
			document.getElementById("divq").appendChild(dispAns);		
			setTimeout(function(){
				dispAns.innerHTML = "";
			},200);
		}
		else if(i == questions.ans1)
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are right <span class='boldClass'>&#128077;</span> ";
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
		else
		{
			ev.onclick = "";
			var dispAns = document.createElement("p");
			dispAns.innerHTML = "You are Wrong <span class='boldClass'>&#128078;</span><br>Answer is: "+x.options[questions.ans1].text;
			document.getElementById("divq").appendChild(dispAns);		
			questions.callNextFunction();
		}
	},
	setCallBack:function(cb){
		nextFunction = cb;
	},
	callNextFunction:function()
	{
		setTimeout(function()
		{
			//document.getElementById("question-div").innerHTML = "";
			document.getElementById("question-div").style.animation="";
			document.getElementById("question-div").style.visibility = "hidden";
			nextFunction();
		},800);
	}
}


function navNext()
{
	for(temp=0;temp<=5;temp++)
	{
		document.getElementById("canvas"+temp).style.visibility="hidden";
	}
	simsubscreennum+=1;
	document.getElementById("canvas"+simsubscreennum).style.visibility="visible";
	document.getElementById("nextButton").style.visibility="hidden";
	magic();
}


//-----------------------------------------blink arrow on the next step---------------------------------------------
//blink arrow on the next step
function animatearrow()
{
     if (document.getElementById('arrow1').style.visibility=="hidden")
         document.getElementById('arrow1').style.visibility="visible";
     else
         document.getElementById('arrow1').style.visibility="hidden";
}

//stop blinking arrow
function myStopFunction() 
{
     clearInterval(myInt);
     document.getElementById('arrow1').style.visibility="hidden";
}

function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}

function magic()
{
	if(simsubscreennum==1)
	{
		document.getElementById("dia15").onclick=function(){
			document.getElementById("nextButton").style.visibility="visible";
			ring=15;
			
		}
		document.getElementById("dia30").onclick=function(){
			document.getElementById("nextButton").style.visibility="visible"
			ring=30;
			
		}		
}
else if(simsubscreennum==2)
	{
		if(ring==15){	
			document.getElementById("can2-1").style.visibility="visible"
				document.getElementById("can2-2").style.visibility="visible"
				myInt = setInterval(function(){ animatearrow(); }, 500);
				document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:200px; height: 30px; z-index: 10;";
				document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
				// Code for IE9
				document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
				// Standard syntax
				document.getElementById("arrow1").style.transform = "rotate(180deg)";
				document.getElementById("can2-2").onclick=function()
				{
					myStopFunction();
					document.getElementById("can2-2").style.animation="moveCan 1.8s forwards";
					setTimeout(function()
					{
						document.getElementById("can2-2").style.visibility="hidden"
						document.getElementById("can2-3").style.visibility="visible"
						myInt = setInterval(function(){ animatearrow(); }, 500);
						document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:200px; height: 30px; z-index: 10;";
						document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
						// Code for IE9
						document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
						// Standard syntax
						document.getElementById("arrow1").style.transform = "rotate(180deg)";
						document.getElementById("can2-4").style.visibility="visible"
						document.getElementById("can2-4").onclick=function()
						{
							myStopFunction();
							document.getElementById("can2-4").style.animation="fix_plate 1.5s forwards"
							setTimeout(function()
							{
								document.getElementById("can2-4").style.visibility="hidden"
								document.getElementById("can2-5").style.visibility="visible"
								document.getElementById("can2-5").style.transform="rotateX(45deg)"
								myInt = setInterval(function(){ animatearrow(); }, 500);
								document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:570px; top:150px; height: 30px; z-index: 10;";
								document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
								// Code for IE9
								document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
								// Standard syntax
								document.getElementById("arrow1").style.transform = "rotate(-90deg)";
								document.getElementById("can2-6").style.visibility="visible"
								document.getElementById("can2-6").onclick=function()
								{
									myStopFunction();
									//document.getElementById("can2-6").style.transform="rotate(315deg)"
									document.getElementById("can2-6").style.animation="hammer 1s 3 forwards"
									setTimeout(function()
									{	
										myStopFunction();
										document.getElementById("can2-3").style.animation="hit 1s forwards"
										document.getElementById("can2-5").style.animation="blade_hit  1s forwards"
										setTimeout(function()
										{
											document.getElementById("can2-6").style.visibility="hidden"
											myInt = setInterval(function(){ animatearrow(); }, 500);
											document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:380px; top:300px; height: 30px; z-index: 10;";
											document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
											// Code for IE9
											document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
											// Standard syntax
											document.getElementById("arrow1").style.transform = "rotate(-90deg)";
											document.getElementById("can2-5").onclick=function()
											{
												myStopFunction();
												document.getElementById("can2-5").style.animation="plateRemove 1.5s forwards"
												setTimeout(function(){
													document.getElementById("nextButton").style.visibility="visible"
												},1600)
											}
										},1500);
									},1200);
									
										
								}
							},1600);
							
						}
					},1100);
				}
		}else if(ring==30){
				document.getElementById("can2a").style.visibility="visible"	
					myInt = setInterval(function(){ animatearrow(); }, 500);
					document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:200px; height: 30px; z-index: 10;";
					document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
					// Code for IE9
					document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
					// Standard syntax
					document.getElementById("arrow1").style.transform = "rotate(180deg)";
					document.getElementById("can2a").onclick=function()
					{
						myStopFunction();
						document.getElementById("can2a").style.animation="moveCan_30 1.8s forwards";
						setTimeout(function()
						{
							document.getElementById("can2a").style.visibility="hidden"
							document.getElementById("can2b").style.visibility="visible"
							myInt = setInterval(function(){ animatearrow(); }, 500);
							document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:542.5px; top:200px; height: 30px; z-index: 10;";
							document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
							// Code for IE9
							document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
							// Standard syntax
							document.getElementById("arrow1").style.transform = "rotate(180deg)";
							document.getElementById("can2c").style.visibility="visible"
							document.getElementById("can2c").onclick=function()
							{	
								myStopFunction();
								document.getElementById("can2c").style.animation="fix_plate30 1.5s forwards"	
								setTimeout(function()
								{
									document.getElementById("can2c").style.visibility="hidden"
									document.getElementById("can2d").style.visibility="visible"
									document.getElementById("can2d").style.transform="rotateX(49deg)"
									myInt = setInterval(function(){ animatearrow(); }, 500);
									document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:570px; top:150px; height: 30px; z-index: 10;";
									document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
									// Code for IE9
									document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
									// Standard syntax
									document.getElementById("arrow1").style.transform = "rotate(-90deg)";
									document.getElementById("can2e").style.visibility="visible"
									document.getElementById("can2e").onclick=function()
									{	
										myStopFunction();
										document.getElementById("can2e").style.transform="rotate(330deg)"
										document.getElementById("can2e").style.animation="hammer30 1s 3 forwards"
										setTimeout(function()
										{
											document.getElementById("can2d").style.animation="hit30 1s forwards"
											document.getElementById("can2b").style.animation="blade_hit30  1s forwards"
											setTimeout(function()
											{
												document.getElementById("can2e").style.visibility="hidden"
												myInt = setInterval(function(){ animatearrow(); }, 500);
												document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:400px; top:300px; height: 30px; z-index: 10;";
												document.getElementById("arrow1").style.WebkitTransform = "rotate(-90deg)"; 
												// Code for IE9
												document.getElementById("arrow1").style.msTransform = "rotate(-90deg)"; 
												// Standard syntax
												document.getElementById("arrow1").style.transform = "rotate(-90deg)";
												document.getElementById("can2d").onclick=function()
												{
													myStopFunction();
													document.getElementById("can2d").style.animation="plateRemove 1.5s forwards"
													setTimeout(function()
													{
														document.getElementById("nextButton").style.visibility="visible"
													},1600)
												}
											},1500);

										},1300);
									}
								},1000);
							}
						},1000);
					}

				}
					

		}
	else if(simsubscreennum==3)
	{
		if(ring==15){
			document.getElementById("can2-3").style.visibility="hidden"
			document.getElementById("can2-5").style.visibility="hidden"
			document.getElementById("can3-1").style.visibility="visible"
			document.getElementById("can3-2").style.visibility="visible"
			document.getElementById("can3-3").style.visibility="visible"
				myInt = setInterval(function(){ animatearrow(); }, 500);
				document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:510px; top:140px; height: 30px; z-index: 10;";
				document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
				// Code for IE9
				document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
				// Standard syntax
				document.getElementById("arrow1").style.transform = "rotate(180deg)";
				document.getElementById("can3-3").onclick=function(){
				setTimeout(function(){
					myStopFunction();
					document.getElementById("can3-3").style.animation="moveSupport 2s forwards"
					setTimeout(function(){
						document.getElementById("can3-4").style.visibility="visible"
						document.getElementById("can3-3").style.visibility="hidden"
						document.getElementById("can3-2").style.visibility="hidden"
							myInt = setInterval(function(){ animatearrow(); }, 500);
							document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:660px; top:410px; height: 30px; z-index: 10;";
							document.getElementById("arrow1").style.WebkitTransform = "rotateX(-180deg)"; 
							// Code for IE9
							document.getElementById("arrow1").style.msTransform = "rotateX(-180deg)"; 
							// Standard syntax
							document.getElementById("arrow1").style.transform = "rotateX(-180deg)";
							document.getElementById("can3-4").onclick=function(){
								myStopFunction();
								document.getElementById("can3-4").style.animation="movetube 2s forwards"
								setTimeout(function(){
									document.getElementById("can3-1").style.visibility="hidden"
									document.getElementById("can3-4").style.visibility="hidden"
									document.getElementById("can3-5").style.visibility="visible"
									setTimeout(function()
									{
										document.getElementById("nextButton").style.visibility="visible"
									},1000)
								},1000);
								
							}
					},1500)
				});
			}	

			
		}else if(ring==30){
			document.getElementById("can2-1").style.visibility="visible"
			document.getElementById("can2d").style.visibility="hidden"
			document.getElementById("can2b").style.visibility="hidden"
			document.getElementById("can3a").style.visibility="visible"
			document.getElementById("can3b").style.visibility="visible"
			document.getElementById("can3c").style.visibility="visible"
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:510px; top:140px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(180deg)";
			document.getElementById("can3b").onclick=function(){
				setTimeout(function(){
					myStopFunction();
					document.getElementById("can3b").style.animation="moveSupport 2s forwards"
					setTimeout(function(){
						document.getElementById("can3b").style.visibility="hidden"
						document.getElementById("can3c").style.visibility="hidden"
						document.getElementById("can3d").style.visibility="visible"
							myInt = setInterval(function(){ animatearrow(); }, 500);
							document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:660px; top:410px; height: 30px; z-index: 10;";
							document.getElementById("arrow1").style.WebkitTransform = "rotateX(-180deg)"; 
							// Code for IE9
							document.getElementById("arrow1").style.msTransform = "rotateX(-180deg)"; 
							// Standard syntax
							document.getElementById("arrow1").style.transform = "rotateX(-180deg)";
							document.getElementById("can3d").onclick=function(){
								myStopFunction();
								document.getElementById("can3d").style.animation="movetube 2s forwards"
								setTimeout(function(){
									document.getElementById("can3a").style.visibility="hidden"
									document.getElementById("can3d").style.visibility="hidden"
									document.getElementById("can3e").style.visibility="visible"
									setTimeout(function()
									{
										document.getElementById("nextButton").style.visibility="visible"
									},1000)
								},800);
							}

					},1500);
				});

			}

		}

	}
	else if(simsubscreennum==4)
	{
		if(ring==15){
			document.getElementById("can3-5").style.visibility="hidden"
			document.getElementById("can4-4").style.visibility="visible"
			document.getElementById("can4-1").style.visibility="visible"
				myInt = setInterval(function(){ animatearrow(); }, 500);
				document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:560px; top:140px; height: 30px; z-index: 10;";
				document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
				// Code for IE9
				document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
				// Standard syntax
				document.getElementById("arrow1").style.transform = "rotate(180deg)";
				document.getElementById("can4-1").onclick=function(){
					myStopFunction();
					document.getElementById("can4-1").style.animation="moveBucket 2s forwards"
					setTimeout(function(){
						document.getElementById("can4-1").style.visibility="hidden"
						document.getElementById("can4-2").style.visibility="visible"
						document.getElementById("can4-4").style.visibility="visible"
						setTimeout(function(){
							document.getElementById("can4-3").style.visibility="visible"
							document.getElementById("can4-3").style.animation="fillWater 2s forwards"
							setTimeout(function(){
								document.getElementById("can4-2").style.visibility="hidden"
								var q1 = Object.create(questions);																								
								generateQuestion1(q1,"Why water level in both rings should be equal to minimize: ","","Lateral Flow","Longitudinal Flow",1,screen4Proceed,300,80,300,150);
								
								
							},1500);
						},1000);
					},1500);
				}
			
		}else if(ring==30){
			document.getElementById("can3e").style.visibility="hidden"
			document.getElementById("can4d").style.visibility="visible"
			document.getElementById("can4a").style.visibility="visible"
				myInt = setInterval(function(){ animatearrow(); }, 500);
				document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:510px; top:140px; height: 30px; z-index: 10;";
				document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
				// Code for IE9
				document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
				// Standard syntax
				document.getElementById("arrow1").style.transform = "rotate(180deg)";
				document.getElementById("can4a").onclick=function(){
					myStopFunction();
					document.getElementById("can4a").style.animation="moveBucket 2s forwards"
					setTimeout(function(){
						document.getElementById("can4a").style.visibility="hidden"
						document.getElementById("can4b").style.visibility="visible"
						setTimeout(function(){
							document.getElementById("can4c").style.visibility="visible"
							document.getElementById("can4c").style.animation="fillingWater 2s forwards"
							setTimeout(function(){
								document.getElementById("can4b").style.visibility="hidden"
								var q1 = Object.create(questions);																								
								generateQuestion1(q1,"Why water level in both rings should be equal to minimize: ","","Lateral Flow","Longitudinal Flow",1,screen4Proceed,300,80,300,150);
								
								
							},1500);
						},1000);
						
					},1500);

				}

		}

	}
	else if(simsubscreennum==5)
	{
		if(ring==15){
			document.getElementById("can4-3").style.visibility="hidden"
			document.getElementById("can4-4").style.visibility="hidden"
			document.getElementById("can5-1").style.visibility="visible"
			document.getElementById("can5-2").style.visibility="visible"
			document.getElementById("can5-3").style.visibility="visible"
			document.getElementById("can5-5").style.visibility="visible"
			document.getElementById("can5-6").style.visibility="visible"
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:510px; top:140px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(180deg)";
			document.getElementById("can5-2").onclick=function(){
				myStopFunction();
				document.getElementById("can5-1").style.visibility="hidden"
				document.getElementById("can5-2").style.visibility="hidden"
				document.getElementById("can5-4").style.visibility="visible"
				document.getElementById("can5-3").style.animation="stopwatch 35s linear infinite"
				document.getElementById("myTable").style.visibility="visible"
				setTimeout(function(){
					document.getElementById("can5-5").style.animation="waterDecrease 2s forwards"
					
					addRow();
				
					setTimeout(function(){
						document.getElementById("nextButton").style.visibility="visible"
					},1500);
				},2500);
				
			}
					
				
		}else if(ring==30){
			document.getElementById("can4c").style.visibility="hidden"
			document.getElementById("can4d").style.visibility="hidden"
			document.getElementById("can5a").style.visibility="visible"
			document.getElementById("can5b").style.visibility="visible"
			document.getElementById("can5c").style.visibility="visible"
			document.getElementById("can5e").style.visibility="visible"
			document.getElementById("can5f").style.visibility="visible"
			myInt = setInterval(function(){ animatearrow(); }, 500);
			document.getElementById('arrow1').style="visibility:visible ;position:absolute; left:510px; top:140px; height: 30px; z-index: 10;";
			document.getElementById("arrow1").style.WebkitTransform = "rotate(180deg)"; 
			// Code for IE9
			document.getElementById("arrow1").style.msTransform = "rotate(180deg)"; 
			// Standard syntax
			document.getElementById("arrow1").style.transform = "rotate(180deg)";
			document.getElementById("can5b").onclick=function(){
				myStopFunction();
				document.getElementById("can5a").style.visibility="hidden"
				document.getElementById("can5b").style.visibility="hidden"
				document.getElementById("can5d").style.visibility="visible"
				document.getElementById("can5c").style.animation="stopwatch 35s linear infinite"
				setTimeout(function(){
					document.getElementById("can5e").style.animation="water_Decrease 2s forwards"
					document.getElementById("myThirdTable").style.visibility="visible"
					addRows();
					setTimeout(function(){
						document.getElementById("nextButton").style.visibility="visible"
					},1500);
				},1500);
				
			}
		}
			
			
	}else if(simsubscreennum==6)
		{
			if(ring==15){
				document.getElementById("can5-5").style.visibility="hidden"
				document.getElementById("can5-6").style.visibility="hidden"
				document.getElementById("myTable").style.visibility="hidden"
				document.getElementById("mySecondTable").style.visibility="visible"
				document.getElementById("can5-4").style.visibility="hidden"
				document.getElementById("can5-3").style.visibility="hidden"
				document.getElementById("can4-4").style.visibility="hidden"
				document.getElementById("can4-3").style.visibility="hidden"
				document.getElementById("can2-1").style.visibility="hidden"
				addSecondTable();
				document.getElementById("checkButton").style.visibility="visible"
				document.getElementById("iv").style.visibility="visible"
				document.getElementById("itv").style.visibility="visible"
				document.getElementById("ivi").style.visibility="visible"
				document.getElementById("itvi").style.visibility="visible"
				
				
			}else if(ring==30){
				document.getElementById("can5e").style.visibility="hidden"
				document.getElementById("can5f").style.visibility="hidden"
				document.getElementById("myThirdTable").style.visibility="hidden"
				document.getElementById("myFourthTable").style.visibility="visible"
				document.getElementById("can5d").style.visibility="hidden"
				document.getElementById("can5c").style.visibility="hidden"
				document.getElementById("can4d").style.visibility="hidden"
				document.getElementById("can4c").style.visibility="hidden"
				document.getElementById("can2-1").style.visibility="hidden"
				addFourthTable();
				document.getElementById("checkBtn").style.visibility="visible"
				document.getElementById("ivii").style.visibility="visible"
				document.getElementById("itvii").style.visibility="visible"
				document.getElementById("iviii").style.visibility="visible"
				document.getElementById("itviii").style.visibility="visible"
			}
		}

	
	
}
function screen4Proceed()
{
	
		document.getElementById("nextButton").style.visibility = "visible";
	
	
}	
function checkInputValid(e) {
	e.value = e.value.match(/\d*(\.\d*)?/)[0];
}
function blinkStop()
{
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
	document.getElementById("alertId2").style.visibility = "hidden";
	document.getElementById("alertId2").style.animation = "";
		
}
function blinkStops(){
	document.getElementById("alertId1").style.visibility = "hidden";
	document.getElementById("alertId1").style.animation = "";
	document.getElementById("alertId3").style.visibility = "hidden";
	document.getElementById("alertId3").style.animation = "";
}
function checkResult()
{
	var idd = document.getElementById("res");
	var idd1 = document.getElementById("chk");
	var ansId = document.getElementById("rightAns");
	document.getElementById("alertId").style.visibility = "hidden";
	document.getElementById("alertId").style.animation = "";
	if(!idd.value  || !idd.value!=" ")
	{
		document.getElementById("alertId").style.visibility = "visible";
		document.getElementById("alertId").style.animation = "blink_effect 1s infinite";
	}else if(idd.value=== 77)
	{
		idd1.style.visibility = "hidden";
		idd.parentNode.removeChild(idd);
		ansId.classList.add("resultStyle");
		ansId.style.color = "black";
		ansId.innerHTML= 77 +"mm<span style='color:green'>&#10004;</span>";
		
	}
	else 
	{
		qCount++;
		blinkStop();
		idd.style.borderColor = "red";
		ansId.style.color = "red";
		ansId.innerHTML= "&#10008;";
		ansId.classList.remove("resultStyle");
		if(qCount == 2)
		{
			idd1.value = "RESULT";
		}
		if(qCount == 3)
		{
			idd1.style.visibility = "hidden";
			idd.parentNode.removeChild(idd);
			ansId.classList.add("resultStyle");
			ansId.style.color = "black";
			ansId.innerHTML= 77+"mm";
			
		}
	}
	
}
function checkResults()
{
	var iddi = document.getElementById("res1");
	var idd2 = document.getElementById("chks");
	var ansId1 = document.getElementById("rightAnswer");
	document.getElementById("alertId1").style.visibility = "hidden";
	document.getElementById("alertId1").style.animation = "";
	if(!iddi.value  || !iddi.value!=" ")
	{
		document.getElementById("alertId1").style.visibility = "visible";
		document.getElementById("alertId1").style.animation = "blink_effect 1s infinite";
	}else if(iddi.value=== 1.6)
	{
		idd2.style.visibility = "hidden";
		iddi.parentNode.removeChild(iddi);
		ansId1.classList.add("resultStyle");
		ansId1.style.color = "black";
		ansId1.innerHTML= 1.6 +"mm/min<span style='color:green'>&#10004;</span>";
		
	}
	else 
	{
		qCounts++;
		blinkStops();
		iddi.style.borderColor = "red";
		ansId1.style.color = "red";
		ansId1.innerHTML= "&#10008;";
		ansId1.classList.remove("resultStyle");
		if(qCounts == 2)
		{
			idd2.value = "RESULT";
		}
		if(qCounts == 3)
		{
			idd2.style.visibility = "hidden";
			iddi.parentNode.removeChild(iddi);
			ansId1.classList.add("resultStyle");
			ansId1.style.color = "black";
			ansId1.innerHTML= 1.6+"mm/min";
			
		}
	}
	
}
function checkResultFinal()
{
	var iddii = document.getElementById("res2");
	var idd3 = document.getElementById("chk1");
	var ansId2 = document.getElementById("rightAnswer1");
	document.getElementById("alertId2").style.visibility = "hidden";
	document.getElementById("alertId2").style.animation = "";
	if(!iddii.value  || !iddii.value!=" ")
	{
		document.getElementById("alertId2").style.visibility = "visible";
		document.getElementById("alertId2").style.animation = "blink_effect 1s infinite";
	}else if(iddii.value=== 62)
	{
		idd3.style.visibility = "hidden";
		iddii.parentNode.removeChild(iddii);
		ansId2.classList.add("resultStyle");
		ansId2.style.color = "black";
		ansId2.innerHTML= 62 +"mm<span style='color:green'>&#10004;</span>";
		
	}
	else 
	{
		qCont++;
		blinkStop();
		iddii.style.borderColor = "red";
		ansId2.style.color = "red";
		ansId2.innerHTML= "&#10008;";
		ansId2.classList.remove("resultStyle");
		if(qCont == 2)
		{
			idd3.value = "RESULT";
		}
		if(qCont == 3)
		{
			idd3.style.visibility = "hidden";
			iddii.parentNode.removeChild(iddii);
			ansId2.classList.add("resultStyle");
			ansId2.style.color = "black";
			ansId2.innerHTML= 62+"mm";
			
		}
	}
	
}
function checkResultFinals()
{
	var iddiii = document.getElementById("res3");
	var idd4 = document.getElementById("chk2");
	var ansId3 = document.getElementById("rightAnswer2");
	document.getElementById("alertId3").style.visibility = "hidden";
	document.getElementById("alertId3").style.animation = "";
	if(!iddiii.value  || !iddiii.value!=" ")
	{
		document.getElementById("alertId3").style.visibility = "visible";
		document.getElementById("alertId3").style.animation = "blink_effect 1s infinite";
	}else if(iddiii.value=== 1.4)
	{
		idd4.style.visibility = "hidden";
		iddiii.parentNode.removeChild(iddiii);
		ansId3.classList.add("resultStyle");
		ansId3.style.color = "black";
		ansId3.innerHTML= 1.4 +"mm/min<span style='color:green'>&#10004;</span>";
		
	}
	else 
	{
		qConts++;
		blinkStops();
		iddiii.style.borderColor = "red";
		ansId3.style.color = "red";
		ansId3.innerHTML= "&#10008;";
		ansId3.classList.remove("resultStyle");
		if(qConts == 2)
		{
			idd4.value = "RESULT";
		}
		if(qConts == 3)
		{
			idd4.style.visibility = "hidden";
			iddiii.parentNode.removeChild(iddiii);
			ansId3.classList.add("resultStyle");
			ansId3.style.color = "black";
			ansId3.innerHTML= 1.4+"mm/min";
			
		}
	}
	
}


//To set the questions division
function generateQuestion(qObject,qn,op1,op2,op3,op4,op5,ansKey,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions(op1,op2,op3,op4,op5);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);	
	qObject.setCallBack(fn);	
}
function generateQuestion1(qObject,qn,op1,op2,op3,ansKey,fn,dleft,dright,dwidth,dheight)
{
	document.getElementById('question-div').style.left=dleft+"px";											
	document.getElementById('question-div').style.top=dright+"px";												
	document.getElementById('question-div').style.width=dwidth+"px";
	document.getElementById('question-div').style.height=dheight+"px";
	qObject.setOptions1(op1,op2,op3);
	qObject.setAns(ansKey);
	qObject.frameQuestions(qn);
	qObject.setCallBack(fn);	
	
}

	
		

