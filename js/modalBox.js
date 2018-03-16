




	
	
	// This script is for displaying a modal window with a single product, whn u click it in lists on main page

// Was not workinf unless use defer -> <script src="js/modalBox.js" defer>
// Get the modal
var modal = document.getElementById('myModal');

// Get the button that opens the modal
//var btn = document.getElementById("myBtn");
var btn = document.getElementsByClassName("myBtn");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];



// Below handles clicking on product item in List View. Uses pure JS!!.
// When the user clicks the button, open the modal 
//it fistly uses id
/*btn.onclick = function() {
    modal.style.display = "block";
}*/
window.info; // to pass it to myCore.js

for (var i=0; i < btn.length; i++) {
    btn[i].onclick = function(){
		var idX = this.id; // get the is, that contains product-price, i.e "Dnb-12.55"
		//alert( idX );
        modal.style.display = "block";
		
		info = idX.split('-');
		$("#productName").html(info[0]); // html the product name
		$("#productPrice").html(info[1] + " UAH");  // html the product price
		
		//check if this id product has been selected previously (exists in object), and if contains any pcs amount already
		if (productsObject.hasOwnProperty(info[0])) {
			alert ('was selected');
			$("#productPcs").html(productsObject[info[0]]['quantity']);
		} else {
			alert ("first time");
			$("#productPcs").html(0);
		}
    }
};
// End Below handles clicking on product item in List View. Uses pure JS!!.






// When the user clicks on <span> (x), close the modal
span.onclick = function() {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

