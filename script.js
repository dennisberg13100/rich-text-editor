/* In this script I organized the DOM sturcture inside de editor ans the information 
 * It always satrts with a div
 * The divs are orderd with Ids to make it easier to get this Id, but no style is given directly to this Id, because they change
 * Select info retuns an object wit the starting and ending div's ID, the start end ofset and an array with all the idv's IDs
 * all the functions taht change the style of the text are in editor.js
 */
let prevText = document.querySelector('#prevText');
let tagText = document.querySelector('#tagText');
let cleanText = null;
let lastPos = 0; 
let lastKeyCode = null;


// Just security, that no one writes someting strange directly in the textarea
tagText.addEventListener('keydown', function(e){
	e.preventDefault();
});

prevText.addEventListener('keydown', function(e){
	
	lastKeyCode = e.keyCode;
	// Enter with an empty text also results in an error and breaks the tag tree 
	if ( e.keyCode === 13 && prevText.innerHTML.length === 5) { // it has allready a </div> inside... so even empty its length is 5
		e.preventDefault();
	} 
})

prevText.addEventListener('keyup', function(e){
	// taking the position of the caret
	lastPos = getPosition();
	
	// check if our starting text is in a <div>
	if( prevText.innerHTML.match(/^<div id="0">|^<div>/) === null && lastKeyCode !== 13){// I'm checking the last key because I don't want that it insert the div tag when the action from the key is prevented
		prevText.innerHTML = '<div>'+prevText.innerHTML
		setPosition(lastPos);
	}

	// Remove empty divs if its not the first and only one
	if(prevText.innerHTML.match(/<div><\/div>/) !== null && prevText.innerHTML.length !== 11){
		console.log('agora a gente exclui a div');
		prevText.innerHTML.replace('<div><\/div>', '');
	}

	// Adding ID's to my div so that i can track them easely
	divId();
	

	tagText.value = prevText.innerHTML;
	
});

// This function return an Object with the baisc selection information
// The start point is always in the begin (doesn't matter the directioin of the selection)
function selectionInfo() {

	let startId = window.getSelection().anchorNode.parentNode.id;
	let endId = window.getSelection().extentNode.parentNode.id;
	let startOffset = window.getSelection().anchorOffset;
	let endOffset = window.getSelection().focusOffset;
	if (startId > endId) {
		// fixing ID's order
		let tempId = startId;
		startId = endId;
		endId = tempId;
		// fixing offset's order
		let tempOffset = startOffset;
		startOffset = endOffset;
		endOffset = tempOffset;
	}
	let idArray = [];
	let isJustCaret = window.getSelection().isCollapsed;
	function idArrayf() {
		for ( let i = startId ; i <= endId; i++){
			idArray.push(parseInt(i));
		}
	};
	idArrayf();
	
	let obj = {
		startId: startId,
		endId: endId,
		idArray: idArray,
		startOffset: startOffset,
		endOffset: endOffset,
		isJustCaret: isJustCaret,
	}

	//console.log(window.getSelection());
	//console.log("The selectio starts on div "+startId+" and end on div "+endId);
	//console.log(startOffset+' - '+endOffset);
	return obj;
}

function getPosition() {
    let id = 'prevText';
	let obj = selectionInfo();
	if(obj.startId !== NaN) {
		id = obj.startId;
	}
    return [id, obj.startOffset];
}

function divId() {
	for ( let i = 0; i < prevText.childElementCount; i++){
		prevText.children[i].removeAttribute('id');
		prevText.children[i].id = i
	}
}

function setPosition(pos) {
	let input = document.getElementById(pos[0]);
	input.focus();
    document.getSelection().collapse(input, pos[1]);

}

// function setPosition(pos) {
// 	prevText.focus();
//     document.getSelection().collapse(prevText, pos);
//     return;
// }