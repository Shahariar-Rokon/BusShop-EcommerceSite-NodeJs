let carts = document.querySelectorAll(".add-cart");
 let products = [
    {
        name:'Black T-Shirt',
        tag:'BlackTshirt',
        price: 15,
        inCart:0
    },
    {
        name:'White T-shirt',
        tag:'whitetshirt',
        price: 20,
        inCart:0
    },
    {
        name:'Skyblue T-Shirt',
        tag:'bluetshirt',
        price: 18,
        inCart:0
    },
    {
        name:'Green T-Shirt',
        tag:'BangladeshTshirt',
        price: 25,
        inCart:0
    }  
 ];

for(let i=0; i < carts.length; i++){
    carts[i].addEventListener('click',()=>{
        cartNumbers(products[i])
        totalCost(products[i]);
    })
}
function onLoadCartNumbers(){
    let productNumbers=localStorage.getItem('cartNumbers');
    if(productNumbers){
        document.querySelector('.cart span').textContent=productNumbers;
    }
}
function cartNumbers(product){                
  let productNumbers=localStorage.getItem('cartNumbers');
  productNumbers=parseInt(productNumbers);

   if(productNumbers){
      localStorage.setItem('cartNumbers', productNumbers+1);
      document.querySelector('.cart span').textContent=productNumbers+1;
    } else{
      localStorage.setItem('cartNumbers',1);
      document.querySelector('.cart span').textContent=1;
    }

    setItems(product)
 
}
function setItems(product){
    let cartItems =localStorage.getItem('productsInCart');
    cartItems=JSON.parse(cartItems);
    if(cartItems != null){
        if(cartItems[product.tag]==undefined){
            
            cartItems={
                ...cartItems,
                [product.tag]: product
            } 
        }
        cartItems[product.tag].inCart+=1;
    }else{
        product.inCart=1;
     cartItems={
        [product.tag]:product
      }

    }
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
}

function totalCost(product){

    let cartCost=localStorage.getItem('totalCost');
    
    if(cartCost!=null){
        cartCost=parseInt(cartCost);
        localStorage.setItem("totalCost", cartCost + (product.price*product.inCart));
    }else{
        localStorage.setItem("totalCost",product.price*product.inCart);
    }
    
}
function displayCart(){
    let cartItems=localStorage.getItem("productsInCart");
    cartItems=JSON.parse(cartItems);
    let productContainer=document.querySelector(".products");
    let cartCost=localStorage.getItem('totalCost');
    if(cartItems && productContainer ){
        productContainer.innerHTML='';
        Object.values(cartItems).map(item =>{
            productContainer.innerHTML += `
            <div class="product">
            <ion-icon name="close-circle" data-tag="${item.tag}"></ion-icon>
               <img src="./images/${item.tag}.jpg">
               <span>${item.name}<span>
            </div>
            <div class="price">$${item.price},00</div>
            <div class="quantity">
               <ion-icon name="chevron-back-circle-outline"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="chevron-forward-circle-outline"></ion-icon>
            </div>
            <div class="total">$${item.inCart*item.price},00</div>
            `         
        });
        productContainer.innerHTML += `
        <div class="basketTotalContainer">
           <h4 class="basketTotalTitle">
               Basket Total
            </h4>
            <h4 class="basketTotal">
                $${cartCost},00
            </h4>  
        </div> 
        `;    
        let removeButtons = document.querySelectorAll('.product ion-icon');
removeButtons.forEach(button => {
  button.addEventListener('click', () => {
    let tag = button.getAttribute('data-tag');
    let item = cartItems[tag];
    localStorage.setItem("cartNumbers", parseInt(localStorage.getItem('cartNumbers')) - item.inCart);
    document.querySelector('.cart span').textContent=1+parseInt(localStorage.getItem('cartNumbers')) - item.inCart;
    item.inCart = 0;
    delete cartItems[tag];
    localStorage.setItem("productsInCart", JSON.stringify(cartItems));
    let newCartCost = 0;
    Object.values(cartItems).forEach(item => {
      newCartCost += item.price * item.inCart;
    });
    localStorage.setItem("totalCost", newCartCost);
    displayCart();
  });
});
 }
}
onLoadCartNumbers()
displayCart();