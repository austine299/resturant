
import products from "./data.json" with{type: "json"};
console.log(products);


let listCartHTML = document.querySelector(".cart");
let spanTotalquantity = document.querySelector(".spanQuantity");
const totalAmountHTML = document.querySelector(".total-price");
let carts = []

console.log(carts);


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
						<span>${cart.quantity}x</span>
						<span> @$${info.price} </span>
						<span> $${info.price * cart.quantity}</span>
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
	totalAmountHTML.innerText = `Total: $${totalAmount}`;
};



  /*
function updateCart(){
	const cartHTML = cart.map(
		(Item) => `
			<div class="container">
				<div class="cart-items">
					<strong>${Item.name}</strong>
					<span>${Item.quantity}</span>
					<span>@${Item.price}</span>
					<span></span>
					<hr noshade="true" size="1px" />
				
				</div>
			</div>
		`
	);

	const cartItems = document.querySelector(".cart");
	cartItems.innerHtml = cartHTML.join("");

}

  updateCart();


function addToCart(products, id){
	const product = products.find((productShow) => productShow.id === id);
	cart.unshift(product);
	updateCart();
};*/



// const content = document.querySelector(".product-body");

// fetch("data.json")
// 	.then(res => res.json())
// 	.then(data=>{
// 		data.forEach(product => {
// 			content.insertAdjacentHTML('beForeend', `
// 			<div class="product-card">
// 				<img src = "${product.image.desktop}" clas="pro-image" style=
// 					"width: 100%; border-radius: 1rem;"/>
// 		        <button class="product-btn" id=${product.id} style ="position: relative; top:-2rem; left:20%; margin-bottom:-20px;">
// 		        	<img src ="assets/images/icon-add-to-cart.svg" /> Add to Cart</button>
// 		        <span class="product-name" style="color:">${product.category}</span>
// 		        <span class="product-name" style = "font-weight: bold; font-size:1rem;">${product.name}</span>
// 		        <strong style= "color:hsl(14, 86%, 42%);">$${product.price}</strong>
// 		    </div>`)
// 		}) 

// 	})

/*const products = [
 {image: "image-waffle-desktop.jpg", name: "Waffle", description: "Waffle with Berries", price: 6.50, id: 1,quantity:1,},
 {image: "image-creme-brulee-desktop.jpg", name: "Crème Brûlée", description: "Vanilla Bean Crème Brûlée", price: 7.00, id: 2,quantity:1,},
 {image: "image-macaron-desktop.jpg", name: "Macaron", description: "Macaron Mix of Five", price: 8.00, id: 3,quantity:1,},
 {image: "image-tiramisu-desktop.jpg", name: "Tiramisu", description: "Classic Tiramisu", price: 4.00, id: 1,quantity:1,},
 {image: "image-meringue-desktop.jpg", name: "Pie", description: "Lemon Meringue Pie", price: 5.00, id: 1,quantity:1,},
 {image: "image-cake-desktop.jpg", name: "Cake", description: "Red Velvet Cake", price: 4.50, id: 1,quantity:1,},
 {image: "image-brownie-desktop.jpg", name: "Brownie", description: "Salted Caramel Brownie", price: 4.50, id: 1,quantity:1,},
 {image: "image-panna-cotta-desktop.jpg", name: "Panna Cotta", description: "Vanilla Panna Cotta", price: 6.50, id: 1,quantity:1,},

];*/




