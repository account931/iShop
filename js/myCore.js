
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
        addToCart(); // add selected product to cart
		refreshCartIcon(); // recalculate the Cart Icon -  Calculates the Object sum and refresh the Cart Icon
    });
	//------------------------------
	
	
	
	// Click to see the object************
	$("#cartPrice").click(function(){
       alert(JSON.stringify(productsObject, null, 4));
    });
	//------------------------------
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 

	function actionPlus () {
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
	
	function actionMinus () {
		var prodName = info[0]; // get it from modalBox.js
		var prodPrice = info[1]; // get price from modalBox.js
		var pcs = $("#productPcs").html(); // get the amount of pieces
		
		// if the selected amount in NULL, do nothing
		if (pcs == 0) {
			return;
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
	
	
	
	
	
	
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function addToCart () {
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
			alert(JSON.stringify(productsObject, null, 4));
		}
		
	}
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	
	// Calculates the Object sum and refresh the Cart Icon
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function refreshCartIcon () {
		var sum = 0;
		for (var key in productsObject) {
			 var sumX = productsObject[key]['price'] * productsObject[key]['quantity'];
			 sum = sum + sumX;
		}
		
		sumXX = substringSum (sum);
		$("#cartPrice").html(sumXX + " UAH");
		
	}
	
	// **                                                                                  **
    // **************************************************************************************
    // **************************************************************************************
	
	
	
	
	// substring sum if it has too much digits after dot (i.e 12.99999999)
	// **************************************************************************************
    // **************************************************************************************
    //                                                                                     ** 
	
	function substringSum (mySum) {
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
	
	
	
});