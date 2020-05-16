
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
	if ( e.keyCode === 13) { 
		divId();
	}

	tagText.value = prevText.innerHTML;
	
});

// Get the selected area 
// prevText.addEventListener('mouseup', function() {
// 	prevText.focus();
// 	console.log(prevText.getSelection());
// });

function bold() {
	
	console.log(window.getSelection());
	console.log(window.getSelection().baseNode.parentNode.id);
	console.log(window.getSelection().baseNode.parentNode.parentNode.id);
}

function getPosition() {
	prevText.focus();
	let _range = document.getSelection().getRangeAt(0);
	let range = _range.cloneRange();
	range.selectNodeContents(prevText);
    range.setEnd(_range.endContainer, _range.endOffset);
    
    return range.toString().length;
}

function divId() {
	for ( let i = 0; i < prevText.childElementCount; i++){
		prevText.children[i].id = i
	}
}

function setPosition(pos) {
	prevText.focus();
    document.getSelection().collapse(prevText, pos);
    return;
}