
import products from "./data.json" with{type: "json"};
console.log(products);


let listCartHTML = document.querySelector(".cart");
let spanTotalquantity = document.querySelector(".spanQuantity");
const totalAmountHTML = document.querySelector(".total-container");
const totalAmountpaid = document.querySelector(".checkoutAmount");
let carts = []



const productsHTML = products.map(
	(productShow) => `<div class="product-card" id=${productShow.id}>
		<img src = "${productShow.image.desktop}" clas="pro-image" style=
			  "width: 100%; border-radius: 1rem;"/>
		<button class="product-btn"  >
			<img src ="assets/images/icon-add-to-cart.svg" /> Add to Cart</button>
		<div class="plus-and-minu-container" >
			<div class="plus-and-minus btn">
				<span  class="minus" style= "">-</span>
				
				<span style="color:black;" class ="spanQuantity">
				0
				</span>
				<span  class="plus" style= "">+</span>
			</div>
		</div>
		  <span class="product-name" style="color:">${productShow.category}</span>
		  <span class="product-name" style = "font-weight: bold; font-size:1.2rem;">${productShow.name}</span>
		  <strong style= "color:hsl(14, 86%, 42%);">$${productShow.price}</strong>
	  </div>`

);
  
const content = document.querySelector(".product-body");
content.innerHTML=productsHTML.join("");

content.addEventListener("click", (event)=>{
	let positionClick = event.target;
	if(positionClick.classList.contains("product-btn")){
		let product_id = positionClick.parentElement.id;
		
		$(".btn-container").css("display", "block");
		$(".empty-cart").css("display", "none");
		$(".total-container").css("display", "block");

		addToCart(product_id);
	}
	

})

// $(".product-btn").click(function(){
// 	$(".plus-and-minu-container").css("display", "block");
// 	$(".product-btn").css("display", "none");
// })

content.addEventListener("click", (event)=>{
	let positionClick = event.target;
	if(positionClick.classList.contains("plus")){
		let product_id = positionClick.parentElement.parentElement.parentElement.id;
		increment(product_id);
	}
})

content.addEventListener("click", (event)=>{
	let positionClick = event.target;
	if(positionClick.classList.contains("minus")){
		let product_id = positionClick.parentElement.parentElement.parentElement.id;
		decrement(product_id);
	}
	
})


$(".delete").click(function(){
	if(carts.length > 0){
		carts =[];
		
		$(".btn-container").css("display", "none");
		$(".empty-cart").css("display", "flex");
		$(".total-container").css("display", "none");
	}	
	
	addCartToHTML();
})

const increment =(product_id)=>{
	let productPositionInCart = carts.findIndex((value) => value.product_id == product_id);
	carts[productPositionInCart].quantity++;
	
	addCartToHTML();

}

const decrement =(product_id)=>{
	let productPositionInCart = carts.findIndex((value) => value.product_id == product_id);
	carts[productPositionInCart].quantity--;
	if(carts[productPositionInCart].quantity <= 0){
		delete carts[productPositionInCart];
	}
	
	
	addCartToHTML();

}

const addToCart =(product_id)=>{
	let productPositionInCart = carts.findIndex((value) => value.product_id == product_id);
	if(carts.length <= 0){
		carts =[{
			product_id: product_id,
			quantity: 1
		}]

	}
	else if(productPositionInCart < 0){
		carts.push({
			product_id: product_id,
			quantity: 1
		});
	}
	else{
		carts[productPositionInCart].quantity = carts[productPositionInCart].quantity + 1;
	}
	
	console.log(carts);
	addCartToHTML();

}



const addCartToHTML =() =>{
	listCartHTML.innerHTML = '';
	let totalQuantity = 0;
	let totalAmount = 0;
	if(carts.length > 0){
		carts.forEach(cart =>{
			totalQuantity = totalQuantity + cart.quantity;
			let newCart = document.createElement("div");
			newCart.classList.add("carts_container");
			let positionProduct = products.findIndex((value) => value.id == cart.product_id);
			let info =products[positionProduct];
			newCart.innerHTML = `

				<div class="cart-items">
					<div>
						<h5>${info.name}</h5>
						<div style="display:flex; gap:15px;">
						<span style = "color:red;">${cart.quantity}x</span>
						<span> @$${info.price} </span>
						<span> $${info.price * cart.quantity}</span>
						<button class="remove">X</button>
					</div>
					<hr noshade="true" size="1px" />
					<div class="cart-footer cart-header">
					</div>
				</div>
			`;
			listCartHTML.appendChild(newCart);
			totalAmount = totalAmount + info.price * cart.quantity;
		});
	}
	spanTotalquantity.innerText = totalQuantity;
	totalAmountHTML.innerHTML = `
        <div class="" style ="display: flex; justify-content: space-between;">
			<span>Order Total</span> 
			<span class ="total-price">$${totalAmount}</span>
        </div>`;

};



const checkoutCart =() =>{
	
	const checkout = document.querySelector(".checkout-container");
	checkout.innerHTML = '';
	let totalQuantity = 0;
	let totalAmount = 0;
	if(carts.length > 0){
		carts.forEach(cart =>{
			totalQuantity = totalQuantity + cart.quantity;
			let newCart = document.createElement("div");
			newCart.classList.add("checkout");
			let positionProduct = products.findIndex((value) => value.id == cart.product_id);
			let info =products[positionProduct];
			newCart.innerHTML = `

				<div class="cart-items">
					<div class = "row">
						<img src= ${info.image.thumbnail} class ="col-sm-2 col-lg-2" ">
						<div  class ="col-sm-8 col-lg-8">
							<h5>${info.name}</h5>
							<div style="display:flex; gap:15px;">
								<span style = "color:red;">${cart.quantity}x</span>
								<span> @$${info.price} </span>
							</div>
						</div
						<span  class ="col-sm-2 col-lg-2"> $${info.price * cart.quantity}</span>
					</div>
					<hr noshade="true" size="1px" />
					<div class="cart-footer cart-header">
					</div>
				</div>
			`;
			checkout.appendChild(newCart);
			totalAmount = totalAmount + info.price * cart.quantity;
		});
	}
	totalAmountpaid.innerHTML = `
        <div class="" style ="display: flex; justify-content: space-between;">
			<span>Order Total</span> 
			<span class ="total-price">$${totalAmount}</span>
        </div>`;

};



$(".buy-btn").click(function(){
	$(".checkout-body").css("display", "flex");
	checkoutCart();
});

$(".close-order").click(function(){
	$(".checkout-body").css("display", "none");
});

$(".new-order-btn").click(function(){
	if(carts.length > 0){
		carts =[];
		
		$(".btn-container").css("display", "none");
		$(".empty-cart").css("display", "flex");
		$(".total-container").css("display", "none");
		$(".checkout-body").css("display", "none");
	}	
	
	addCartToHTML();
})



