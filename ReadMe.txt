#emulates Inet shop logic (adding products to cart, plus/minus, cart calculation). 
#So far contains, JS only. Should add a generation the page by PHP SQL means (retrieving content for current shop from SQL). 
#\

How it works:
1. In html each product has a specific ID, which contain prodoct name + price (i.e id="Dnb-12.55");
And additionall it has a common class="myBtn" to trigger a modal page with single product (logic to display modal is in modalBox.js), 
where u can add/minus the quantity. Additionally, in modalBox.js we get the ID of this.id and split ID to name and price.
Modal box is describedribed in html but with empty values, we html() this values received in modalBox.js from this id clicked.

2. All ordered items are stored in object and total sum is calculated live based on object (refreshCartIcon ()).
On load, we chech if a local storage has this object with names, price and quantity and loads it or create new.

3. plus/minus action in single product modal -> get the value of amount html-ed and ++/-- it, and html it back, making total sum recalc.

4. While clicking addToCart button, we add values to object and save to local storage.

5. Final CART ->
5.1 When we click final cart, a slide left window appears, all object items are parsed, html-ed and recalculated in openCalcSidePagewithCart();
We create there product, amount, price and ++/-- buttons with spec id = id of item + "_plus" (id = "dnb_plus"). We get id of each item from each object key.
Call plusItemInSideFinalCart (id), get there clicked id ("dnb_plus"), split, gets pure id "dnb", which is a key in object; get key object quantity, ++ it and add back to object, save to loc storage.