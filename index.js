
import products from "./data.json" with{type: "json"};
console.log(products);

let cartItems = {};
let listCartHTML = document.querySelector(".cart");
let spanTotalquantity = document.querySelector(".spanQuantity");
const totalAmountHTML = document.querySelector(".total-container");
const totalAmountpaid = document.querySelector(".checkoutAmount");
const quantityDecreAndIncre = document.querySelector(".spanQuantity-increament-decreament")
const addToCartBtn =document.querySelectorAll(".product-btn");
const activeImage = document.querySelectorAll(".active-img");
const newProductHTML = document.querySelector(".product-body");

let carts = []


const productsHTML = products.map(
	(productShow) => `<div class="product-card " id=${productShow.id}>
		<img src = "${productShow.image.desktop}" class="pro-image " style=
				"width: 100%; border-radius: 1rem; "/>
		
		<button class="product-btn"  >
			<img src ="assets/images/icon-add-to-cart.svg" /> Add to Cart
		</button>
		
		<button class="active-btn btn">
			<span  class="minus" style= "">-</span>
			
			<span style="color:black;" class ="spanQuantity-increament-decreament" id="quantity${productShow.id}">
			${cartItems[`${productShow.id}`] || 0}
			</span>
			<span  class="plus" style= "">+</span>
		</button>
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
		$(`#${product_id}`).find(".pro-image").addClass("active-img ");
		$(`#${product_id}`).find(".active-btn").css("display", "flex");
		$(`#${product_id}`).find(".product-btn").css("display", "none");
		addToCart(product_id);
	}
	

});


content.addEventListener("click", (event)=>{
	let positionClick = event.target;
	if(positionClick.classList.contains("plus")){
		let product_id = positionClick.parentElement.parentElement.id;
		increment(product_id);
	}
})
   
content.addEventListener("click", (event)=>{
	let positionClick = event.target;
	if(positionClick.classList.contains("minus")){
		let product_id = positionClick.parentElement.parentElement.id;
		decrement(product_id);
	}
	
})


$(".delete").click(function(product_id){
	if(carts.length > 0 || cartItems[`${product_id}`] > 0){
		carts =[];
		cartItems =[];
		$(".btn-container").css("display", "none");
		$(".empty-cart").css("display", "flex");
		$(".total-container").css("display", "none");
		$(".product-btn").css("display", "block");
		$(".active-btn").css("display", "none");
		$(".pro-image").removeClass("active-img ");
	}	
	
	addCartToHTML(product_id);
})

const increment =(product_id)=>{
	let productPositionInCart = carts.findIndex((value) => value.product_id == product_id);
	carts[productPositionInCart].quantity++;
	
	if(cartItems[`${product_id}`] ){
		cartItems[`${product_id}`] += 1;
	}else{
		cartItems[`${product_id}`] = 1;
	}

	addCartToHTML(product_id);



}

const decrement =(product_id)=>{
	let productPositionInCart = carts.findIndex((value) => value.product_id == product_id);
	carts[productPositionInCart].quantity--;
	if(carts[productPositionInCart].quantity <= 0){
		delete carts[productPositionInCart];
		
		$(".btn-container").css("display", "none");
		$(".empty-cart").css("display", "flex");
		$(".total-container").css("display", "none");
		$(`#${product_id}`).find(".pro-image").removeClass("active-img ");
		$(`#${product_id}`).find(".active-btn").css("display", "none");
		$(`#${product_id}`).find(".product-btn").css("display", "block");
		
	}

	
	if(cartItems[`${product_id}`] && cartItems[`${product_id}`] > 0){
		cartItems[`${product_id}`] -= 1;
	}else{
		cartItems[`${product_id}`] = 0;
	}
	
	addCartToHTML(product_id);
}

// function removeItem(){
	
// }


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
	
	cartQun(product_id);
	addCartToHTML(product_id);

}

function cartQun(product_id){
	
	if(cartItems[`${product_id}`] ){
		cartItems[`${product_id}`] += 1;
	}else{
		cartItems[`${product_id}`] = 1;
	}
}


const addCartToHTML =(product_id) =>{
	listCartHTML.innerHTML = '';
	let totalQuantity = 0;
	let totalAmount = 0;
	if(carts.length > 0){
		
		var currentItemQuantity = $(`#${product_id}`).find(`#quantity${product_id}`).text(cartItems[`${product_id}`]);
		console.log(currentItemQuantity);
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
	if(carts.length > 0 || cartItems[`${product_id}`] > 0){
		carts =[];
		cartItems =[];
		$(".btn-container").css("display", "none");
		$(".empty-cart").css("display", "flex");
		$(".total-container").css("display", "none");
		$(".product-btn").css("display", "block");
		$(".carts_container").css("display", "none")
		$(".active-btn").css("display", "none");
		$(".pro-image").removeClass("active-img ");
		$(".checkout-body").css("display", "none");

		let totalQuantity = 0;

		spanTotalquantity.innerText = totalQuantity;
		totalAmountHTML.innerHTML = `
        <div class="" style ="display: flex; justify-content: space-between;">
			<span>Order Total</span> 
			<span class ="total-price">$${totalAmount}</span>
        </div>`;
	}	
	
	addToCart(product_id);
})



