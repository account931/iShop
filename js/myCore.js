// This script is responsible for:
// 1. Creating a new object with products or retrieving it from Local Storage ( If it was prev saved)
// 2.Each product plus, minus, re-calculate the Header cart icon sum




// FALSE - Initialize OBJECT productsObject, was in myCore, but thus was executed there with delay and Line 46 here was failing
//checking if object for all product exist and creat it if not
window.productsObject;
// Check if Object was already saved in Local Storage, if not - creat it
    if (localStorage.getItem("localStorageObject") != null) { // If Local Storage was prev created and exists
		    var retrievedObject = localStorage.getItem('localStorageObject'); // get Loc Storage item
			var retrievedObject = JSON.parse(retrievedObject);
			productsObject = retrievedObject;
			refreshCartIcon (); // recalc the header cart icon, had to outline it out of ready section, as it was invisible
			alert ("Loc St exists" + JSON.stringify(productsObject, null, 4) );
    } else {
        
		// if Loc Storage does not exist (i.e Object was never initialized), create a new Object
	    if (typeof productsObject == "undefined") {
            alert("Object will be created now");
		    var productsObject = { }; //empty object for all cart products
        } else {
		    alert("Object Exists"); // will never fire
	    }
	}	









$(document).ready(function(){
	
	
	
	
	// Click + button*************
	$("#plus").click(function(){
        actionPlus();
		//refreshCartIcon();
    });
	//-----------------------------
	
	
	
	
	
	// Click - minus button*******
	$("#minus").click(function(){
        actionMinus();
		//refreshCartIcon();
    });
	//-----------------------------
	
	
	
	
	// Click Add to cart************
	$("#addToCart").click(function(){
        addToCart(); // add selected product to cart - add product values to OBJECT {productsObject}
		refreshCartIcon(); // recalculate the Cart Icon -  Calculates the Object sum and refresh the Cart Icon
    });
	//------------------------------
	
	
	
	// Click to see the object************
	$("#cartPrice").click(function(){
       alert(JSON.stringify(productsObject, null, 4));
    });
	//------------------------------
	
	
	
	// Click to see the object************
	$("#openSidePagewithCart").click(function(){
       openCalcSidePagewithCart();
    });
	//------------------------------
	
	
	
	
	
	// Click ++plus in Full Final Cart List from Left Panel************
	$(document).on("click", '.fullCartPlus', function() {   // for newly generated
       plusItemInSideFinalCart(this.id);
    });
	//------------------------------
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 

	function actionPlus () 
	{
		//var parentID = $(this).parent().parent().attr('id');
	    //var parentID = $(this).closest('.prName').attr('id');
		
		var prodName = info[0]; // get it from modalBox.js
		var prodPrice = info[1]; // get price from modalBox.js
		var pcs = $("#productPcs").html(); // get the amount of pieces
		//alert(prodPrice + pcs);
		++pcs; //increase pieces + 1
		$("#productPcs").html(pcs);
		
		var total = prodPrice * pcs; // total price = price * amount
		total = total.toString(); // otherwise indexOf works with strings only
		
		// checks if the total price contain ".", if yes, make sure that we won't have price like 12.999999
		if ( total.indexOf(".") != -1 ) {
			//alert ('subst');
			totalArr = total.split(".");
			totalArr[1] = totalArr[1].substring(0,2); // cut the amount after the dot to 2 symbols only
			total = totalArr[0] + "." + totalArr[1];
		}
		
		$("#productTotal").html(total);
		
	}	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function actionMinus () 
	{
		var prodName = info[0]; // get it from modalBox.js
		var prodPrice = info[1]; // get price from modalBox.js
		var pcs = $("#productPcs").html(); // get the amount of pieces
		
		// if the selected amount in NULL, do nothing
		if (pcs == 0) {
			return;
			
		} else if (pcs == 1) { // if user has 1 pcs and wants to null it
			
			if (confirm ("Are you sure to null this order?")) {
				
			    --pcs; //increase pieces + 1
		        $("#productPcs").html(pcs);	
			    $("#productTotal").html(0);
			    delete productsObject[prodName]; // delete this product from object
				
				// Save OBJECT to LocalStorage (use it for -last item only, others variant will use addToCart ();)
			    localStorage.setItem('localStorageObject', JSON.stringify(productsObject)); // Parse Object to string and save to LStorage
				$('#myModal').fadeOut(1900);
				refreshCartIcon();
			}
			
		} else {
			--pcs; //increase pieces + 1
		    $("#productPcs").html(pcs);
			
			var total = prodPrice * pcs; // total price = price * amount
		    total = total.toString(); // otherwise indexOf works with strings only
		
		    // checks if the total price contain ".", if yes, make sure that we won't have price like 12.999999
		    if ( total.indexOf(".") != -1 ) {
			    //alert ('subst');
			    totalArr = total.split(".");
			    totalArr[1] = totalArr[1].substring(0,2); // cut the amount after the dot to 2 symbols only
			    total = totalArr[0] + "." + totalArr[1];
		    }
		
		    $("#productTotal").html(total);
			
		}
		
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	
	
	//Local STORAGE ADDING SHOULD BE HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

	// add selected product to cart - add product values to OBJECT {productsObject}
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function addToCart () 
	{
		var prodName = info[0]; // get product name from modalBox.js
		var prodPrice = info[1]; // get price from modalBox.js
		var pcs = $("#productPcs").html(); // get the amount of pieces
		alert (prodPrice);
		
		if (pcs == 0) {
			alert ("Empty");
			return;
		} else { // add to Object product object {} and insert to it product.price and product.pcs
			productsObject[prodName] = {};
			productsObject[prodName]['price'] = prodPrice;
			productsObject[prodName]['quantity'] = pcs;
			alert(JSON.stringify(productsObject, null, 4)); //to alert OBJECT
			
			// Save OBJECT to LocalStorage
			localStorage.setItem('localStorageObject', JSON.stringify(productsObject)); // Parse Object to string and save to LStorage
			//var retrievedObject = localStorage.getItem('localStorageObject'); // get Loc Storage item
			//var retrievedObject = JSON.parse(retrievedObject); // turn LC string item to object type again
			//alert("Loc ST " + JSON.stringify(retrievedObject, null, 4));
		}
		
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	});
	// END ready
	
	
	
	// Calculates the Object sum and refresh the Cart Icon. 
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function refreshCartIcon () 
	{
		var sum = 0;
		for (var key in productsObject) {
			 var sumX = productsObject[key]['price'] * productsObject[key]['quantity'];
			 sum = sum + sumX;
		}
		
		sumXX = substringSum (sum); //cut odd digits (12.999999)
		
		if(sumXX == undefined) {  // if user -- pieces till 0 and it was the only product, so OBJECT is empty, can actually check if OBJECT empty before running for() loop 
		    $("#cartPrice").html("0 UAH");         // updating price in header cart icon
			$("#totalSumCartFull").html("0 UAH"); // updating price in left full page cart list
		} else {
		    $("#cartPrice").html(sumXX + " UAH");       // updating price in header cart icon
			$("#totalSumCartFull").html(sumXX + " UAH");// updating price in left full page cart list
			
		}
		
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	// substring sum if it has too much digits after dot (i.e 12.99999999)
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function substringSum (mySum) 
	{
		mySum = mySum.toString(); // otherwise indexOf works with strings only
		if ( mySum.indexOf(".") != -1 ) {
			//alert ('subst');
			totalArr = mySum.split(".");
			totalArr[1] = totalArr[1].substring(0,2); // cut the amount after the dot to 2 symbols only
			mySum = totalArr[0] + "." + totalArr[1];
			return mySum;
		}
	}

    // **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
     
	// opens side page with full Cart list and calculates all from the data in OBJECT, generates auto id for +- (i.e id="product_plus")
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function openCalcSidePagewithCart() 
	{
	    //alert(JSON.stringify(productsObject, null, 4)); //to alert OBJECT
        var finalText = "<div class='container'>";
		for (var key in productsObject) {
			
			var addID = key; // alert (addID);
			finalText = finalText + 
			            "<div class='row'>" +
						"<div class='col-sm-6 col-xs-2'>" + key + "</div> " +
						"<div class='col-sm-2 col-xs-2'>" + productsObject[key]['quantity'] + "</div> " +
						"<div class='col-sm-1 col-xs-1'><button type='button' class='btn btn-success fullCartPlus' id=' "  + addID + "_plus'> + </button></div>" +
						"<div class='col-sm-1 col-xs-1'><button class='btn btn-danger'                id=' "  + addID + "_minus'> - </button>" + "</div>" +
						"<div class='col-sm-2 col-xs-2'>" + productsObject[key]['price'] + "</div> " +
						"<div class='col-sm-2 col-xs-2'>" + substringSum (productsObject[key]['quantity'] * productsObject[key]['price']) +
						"</div>" +
						"</div>";
		}
		finalText = finalText + "</div>";
		$("#fullCartList").html(finalText);
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	// Click ++ plus in Final Full Cart from Left
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function plusItemInSideFinalCart (id)
	{
	    //var idm= $("#" +id).val();
		idArray = id.split("_"); 
		var productZ = idArray[0]; // get 1st element = product name (from id="product_plus")
		
		//alert (productZ.trim().length);
	    productZ = productZ.trim(); // trim product as it get 1 blankspace and cause the creash in nenxt line
		var pcs = productsObject[productZ]['quantity']; // get quantity from Object
		++pcs;
		productsObject[productZ]['quantity'] = pcs; // assing new quantity
		localStorage.setItem('localStorageObject', JSON.stringify(productsObject)); // Parse Object to string and save to LStorage
		openCalcSidePagewithCart(); // refresh Left Panel Full Cart
		refreshCartIcon (); // refersh total amount in header cart + total amount in left Full Cart List
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	