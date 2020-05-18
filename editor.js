
// Get the selected area 
prevText.addEventListener('mouseup', function() {
	//console.log(selectionInfo());
});

function alignItems(pos) {
	let obj = selectionInfo();
	console.log(obj);
	for (id in obj.idArray) {
		document.getElementById(id).setAttribute("style", "text-align: "+pos+";");
	}
	
}