"use strict";

var cwp_nmsp = {};

(function(namespace) {

	namespace.redrawLayout = function(element) {

		var docFrag = document.createDocumentFragment();
		var container = null;

		var pcontainerButton = document.createElement("input");
		pcontainerButton.className = "cwp_p_button";
		pcontainerButton.type = "button";
		pcontainerButton.setAttribute("id", "cwp_p_button");
		pcontainerButton.setAttribute("value", "Show Puzzle");
		container = document.createElement("div");
		container.className = "cwp_p_container";
		container.setAttribute("id", "cwp_p_container");
		container.appendChild(pcontainerButton);
		docFrag.appendChild(container);

		container = document.createElement("div");
		container.className = "cwp_q_container";
		container.appendChild(document.createElement("br"));
		var h5ElementAcross = document.createElement("h5");
		h5ElementAcross.className = "cwp_h5_q";
		h5ElementAcross.appendChild(document.createTextNode("Across"))
		container.appendChild(h5ElementAcross);
		var innerContainerAcross = document.createElement("div");
		innerContainerAcross.className = "cwp_q_across_container";
		innerContainerAcross.setAttribute("id", "cwp_q_across_container");
		container.appendChild(innerContainerAcross);
		var h5ElementDown = document.createElement("h5");
		h5ElementDown.className = "cwp_h5_q";
		h5ElementDown.appendChild(document.createTextNode("Down"));
		container.appendChild(h5ElementDown);
		var innerContainerDown = document.createElement("div");
		innerContainerDown.className = "cwp_q_down_container";
		innerContainerDown.setAttribute("id", "cwp_q_down_container");
		container.appendChild(innerContainerDown);
		docFrag.appendChild(container);

		container = document.createElement("div");
		container.className = "cwp_b_container";
		container.setAttribute("id", "cwp_b_container");
		docFrag.appendChild(container);

		element.className = "cwp_container";
		element.appendChild(docFrag);
	};

	namespace.activateCWP = function(element,demoMode,options) {

		if(false === demoMode) {
			if(options.solution) {
				namespace.CWP_SOLUTION_ARRAY = options.solution;
			} else{
				console.error("Error creating puzzle for id -> "+element.getAttribute("id")+" : solution property of options must be set for demoMode value equal to false");
				return;
			}
			if(options.index) {
				namespace.CWP_Q_INDEX_ARRAY = options.index;
			} else {
				console.error("Error creating puzzle for id -> "+element.getAttribute("id")+" : index property of options must be set for demoMode value equal to false");
				return;
			}
			if(options.questions_across) {
				namespace.CWP_QUESTIONS_ACROSS = options.questions_across;
			} else {
				console.error("Error creating puzzle for id -> "+element.getAttribute("id")+" : questions_across property of options must be set for demoMode value equal to false");
				return;
			}
			if(options.questions_down) {
				namespace.CWP_QUESTIONS_DOWN = options.questions_down;
			} else {
				console.error("Error creating puzzle for id -> "+element.getAttribute("id")+" : questions_down property of options must be set for demoMode value equal to false");
				return;
			}
		}
		namespace.redrawLayout(element);
		namespace.bindEvents();
	};

	namespace.CWP_NO_ROWS = 20;

	namespace.CWP_NO_COLS = 20;

	namespace.CWP_SOLUTION_ARRAY =     [[null,	 null,	null,	null,	null,	'P',	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   null,	null,	null,	null,	'R',	null,	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'Q',	null,	null,	null,	'E',	null,	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'U',	null,	null,	null,	'I',	null,	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'A',	'U',	'T',	'O',	'G',	'Y',	'R',	'O',	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'D',	null,	null,	null,	'N',	null,	null,	null,   null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'R',	null,	null,	null,	'I',	null,	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,   'A',	null,	null,	null,	'T',	'R',	'A',	'N',	'S',    'P',    'O',    'N',    'D',    'E',    'R',    null,   null,   null,   null],
                                        [null,   'P',	null,	null,	null,	'I',	null,	null,	null,	null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                        [null,	 'L',	null,	null,	null,	'O',	'V',	'E',	'R',    'S',    'H',    'O',    'O',    'T',    'A',    'R',    'M',    'A',    'C',    null],
                                        [null,	 'A',	null,	null,	null,	'N',	'A',	'V',	'A',    'I',    'D',    null,   'B',    null,   null,   null,   'T',    null,   null,   null],
                                        [null,	 'N',	null,	null,	null,	null,	null,	null,	'I',    null,   null,   null,   'O',    null,   null,   null,   'O',    null,   null,   null],
                                        [null,	 'E',	null,	null,	null,	null,	null,	null,	'R',    null,   null,   null,   'G',    null,   'J',    null,   'W',    null,   null,   null],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	'F',    'L',    'A',    'P',    'E',    'R',    'O',    'N',    null,   null,   null,   null],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	'O',    null,   null,   null,   'Y',    null,   'Y',    'O',    'K',    'E',    null,   null],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	'I',    null,   null,   null,   null,   null,   'S',    'Q',    'U',    'A',    'W',    'K' ],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	'L',    null,   null,   null,   null,   null,   'T',    null,   null,   null,   null,   'N' ],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	null,   null,   null,   null,   null,   null,   'I',    null,   null,   null,   null,   'O' ],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	null,   null,   null,   null,   null,   null,   'C',    null,   null,   null,   null,   'T' ],
                                        [null,	 null,	null,	null,	null,	null,	null,	null,	null,   null,   null,   null,   null,   null,   'K',    null,   null,   null,   null,   null]],



	namespace.CWP_Q_INDEX_ARRAY  =      [[null,   null,   null,   null,   null,      2,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,      1,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,      8,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,      9,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,     10,   null,   null,   null,   null,   null,   null,   null,     11,   null,   null,      6,   null,   null,   null],
                                         [null,   null,   null,   null,   null,     12,   null,   null,      3,   null,   null,   null,      4,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,      5,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,     13,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,     14,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,     15,   null,   null,   null,   null,      7],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
                                         [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null]],

	namespace.CWP_QUESTIONS_ACROSS = [		"1. A type of aircraft that has four or more wings of similar span",
                                            "2. Ignition that takes place in an internal combustion engine before the usual ignition occurs",
                                            "3. The shape of a surface such as a wing, blade, turbine or rotor that generates lift from air passing over it",
                                            "4. An unknown radar contact, usually non-friendly",
                                            "5. The main device found in the cockpit to control the aircraft",
                                            "6. Maximum takeoff weight",
                                            "7. A measurement or unit of speed that equals one nautical mile and about 1.15 statute miles"];

	namespace.CWP_QUESTIONS_DOWN =   [      "8. An aircraft which is often wingless, similar to a helicopter",
                                            "9. A device carried in an airplane which produces a coded pattern which is recognized on an air traffic control radar screen",
                                            "10. Landing an aircraft beyond the runway",
                                            "11. The paved area of an airport, where aircrafts are parked, fuelled, loaded and unloaded",
                                            "12. A device in an aircraft used to help with navigation",
                                            "13. A control surface that uses aspects of both flaps and ailerons",
                                            "14. The control wheel of an aircraft, similar to a steering wheel",
                                            "15. A four digit number assigned to an aircraft. The pilot can use this to identify his/her plane while contacting ATC"];

	namespace.resetUserInputArray = function() {

		return [[null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null],
		        [null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null,   null]];
	};

	namespace.CWP_USER_INPUT_ARRAY = namespace.resetUserInputArray();

	namespace.redrawQuestions = function() {

		var qContainerAcross = document.getElementById("cwp_q_across_container");
		var qContainerDown = document.getElementById("cwp_q_down_container");

		var docFragAcross = document.createDocumentFragment();
		var docFragDown = document.createDocumentFragment();

		var brElement = document.createElement("br");
		var textNode = null;
		var spanElement = document.createElement("span");
		spanElement.className = "cwp_q_span";

		var questionsAcross = namespace.CWP_QUESTIONS_ACROSS;
		var questionsDown = namespace.CWP_QUESTIONS_DOWN;
		var qAcrossLength = namespace.CWP_QUESTIONS_ACROSS.length;
		var qDownLength = namespace.CWP_QUESTIONS_DOWN.length;

		for(var i=0;i<qAcrossLength;i++) {
			docFragAcross.appendChild(brElement.cloneNode(false));
			textNode = document.createTextNode(questionsAcross[i]);
			if(spanElement.hasChildNodes()) {
				spanElement.removeChild(spanElement.firstChild);
			}
			spanElement.appendChild(textNode);
			docFragAcross.appendChild(spanElement.cloneNode(true));
		}
		for(var j=0;j<qDownLength;j++) {
			docFragDown.appendChild(brElement.cloneNode(false));
			textNode = document.createTextNode(questionsDown[j]);
			if(spanElement.hasChildNodes()) {
				spanElement.removeChild(spanElement.firstChild);
			}
			spanElement.appendChild(textNode);
			docFragDown.appendChild(spanElement.cloneNode(true));
		}
		qContainerAcross.appendChild(docFragAcross);
		qContainerDown.appendChild(docFragDown);
	};

	namespace.redrawPuzzle = function(checkSolutionMode) {

		var pContainer =  document.getElementById("cwp_p_container");

		var docFragPContainer = document.createDocumentFragment();
		var docFragForRow     = document.createDocumentFragment();

		var numberOfRows = namespace.CWP_NO_ROWS
		var numberOfCols = namespace.CWP_NO_COLS;

		var cell = document.createElement("input");
		var cellClone = null;
		cell.className = "cwp_cell";
		cell.type = "text";

		var qIndexSpan = document.createElement("span");
		qIndexSpan.className = "cwp_q_index_span";

		var textNode = null;

		for(var i=0;i<numberOfRows;i++) {
			var cellRow = document.createElement("div");
			cellRow.className = "cwp_cell_row";
			for(var j=0;j<numberOfCols;j++) {
				var cellWrapper = document.createElement("span");
				cellWrapper.className = "cwp_cell_wrapper";
				cellClone = cell.cloneNode(false);
				cellClone.setAttribute("id","cwp_cell-"+i+"_"+j);
				var solution = namespace.CWP_SOLUTION_ARRAY[i][j];
				var userInput = namespace.CWP_USER_INPUT_ARRAY[i][j]
				if(null === solution) {
					cellClone.className+= " cwp_cell_disable";
					cellClone.setAttribute("disabled",true);
				} else {
					cellClone.className+= " cwp_cell_enable";
					if(checkSolutionMode) {
						if(null === userInput) {
							alert("Please complete the puzzle");
							return;
						}
						cellClone.setAttribute("disabled", true);
						if(null !== userInput) {
							cellClone.setAttribute("value", userInput);
						}
						if(userInput === solution) {
							cellClone.className+= " cwp_cell_sol_true";
						} else {
							cellClone.className+= " cwp_cell_sol_false";
						}
					}
				}
				cellWrapper.appendChild(cellClone);
				var qIndexValue = namespace.CWP_Q_INDEX_ARRAY[i][j];
				if(null !== qIndexValue) {
					if(qIndexSpan.hasChildNodes()) {
						qIndexSpan.removeChild(qIndexSpan.firstChild);
					}
					var textNode = document.createTextNode(qIndexValue);
					qIndexSpan.appendChild(textNode);
					cellWrapper.appendChild(qIndexSpan.cloneNode(true));
				}
				docFragForRow.appendChild(cellWrapper);
			}
			cellRow.appendChild(docFragForRow);
			docFragPContainer.appendChild(cellRow.cloneNode(true));
		}
		pContainer.innerHTML="";
		pContainer.appendChild(docFragPContainer);
		var cells = document.getElementsByClassName("cwp_cell_enable");
		for(var i=0;i<cells.length;i++) {
			cells[i].addEventListener("keydown", function(event) {
				var keyCode = event.keyCode;
				var cellIndex = (this.getAttribute("id")+"").split("-")[1].split("_");
				var rowIndex = Number(cellIndex[0]);
				var colIndex = Number(cellIndex[1]);
				var edgeRowIndex = namespace.CWP_NO_ROWS-1;
				var edgeColIndex = namespace.CWP_NO_COLS-1;
				var nextCell = null;
				var nextCellClass = null;

				if(37 === keyCode && colIndex>0) {
					do{
						colIndex-=1;
						nextCell = document.getElementById("cwp_cell-"+rowIndex+"_"+colIndex);
						nextCellClass = nextCell.className;
					}while(colIndex>0 && nextCellClass.indexOf("cwp_cell_enable") === -1);
					nextCell.focus();
				} else if(38 === keyCode && rowIndex>0) {
					do{
						rowIndex-=1;
						nextCell = document.getElementById("cwp_cell-"+rowIndex+"_"+colIndex);
						nextCellClass = nextCell.className;
					}while(rowIndex>0 && nextCellClass.indexOf("cwp_cell_enable") === -1);
					nextCell.focus();
				} else if(39 === keyCode && colIndex<edgeColIndex) {
					do{
						colIndex+=1;
						nextCell = document.getElementById("cwp_cell-"+rowIndex+"_"+colIndex);
						nextCellClass = nextCell.className;
					}while(colIndex<edgeColIndex && nextCellClass.indexOf("cwp_cell_enable") === -1);
					nextCell.focus();
				} else if(40 === keyCode && rowIndex<edgeRowIndex) {
					do{
						rowIndex+=1;
						nextCell = document.getElementById("cwp_cell-"+rowIndex+"_"+colIndex);
						nextCellClass = nextCell.className;
					}while(rowIndex<edgeRowIndex && nextCellClass.indexOf("cwp_cell_enable") === -1);
					nextCell.focus();
				} else if(8===keyCode||46===keyCode){
					if(this.value) {
						this.value = null;
					}
					namespace.CWP_USER_INPUT_ARRAY[rowIndex][colIndex] = null;
				} else if(!(keyCode>47&&keyCode<58||keyCode>95&&keyCode<106||keyCode>64&&keyCode<91)){
					event.preventDefault();
				}else {
					if(this.value) {
						this.value = null;
					}
					namespace.CWP_USER_INPUT_ARRAY[rowIndex][colIndex] = String.fromCharCode(event.keyCode).toUpperCase();
				}
			});
		}
	};

	namespace.redrawButtons = function() {

		var buttonDiv = document.getElementById("cwp_b_container");
		var docFragButton = document.createDocumentFragment();
		var inputButtonFinish = document.createElement("input");
		inputButtonFinish.className = "cwp_b_button";
		inputButtonFinish.type = "button";
		var inputButtonClear = inputButtonFinish.cloneNode(false);
		inputButtonFinish.setAttribute("id", "cwp_b_finish");
		inputButtonFinish.setAttribute("value", "Check Solution/Finish");
		inputButtonClear.setAttribute("id", "cwp_b_clear");
		inputButtonClear.setAttribute("value", "Clear All/Reset");
		docFragButton.appendChild(inputButtonFinish);
		docFragButton.appendChild(inputButtonClear);
		buttonDiv.appendChild(docFragButton);

		document.getElementById("cwp_b_clear").addEventListener("click",function(){
			namespace.CWP_USER_INPUT_ARRAY = namespace.resetUserInputArray();
			namespace.redrawPuzzle(false);
		});
		document.getElementById("cwp_b_finish").addEventListener("click", function() {
			namespace.redrawPuzzle(true);
		});
	};

	namespace.bindEvents = function() {

		document.getElementById("cwp_p_button").addEventListener("click", function() {
			namespace.redrawPuzzle(false);
			namespace.redrawQuestions();
			namespace.redrawButtons();
		});
	};

})(cwp_nmsp);