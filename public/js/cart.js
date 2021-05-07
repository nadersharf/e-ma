// _____________cart ________________
let cars =document.querySelectorAll('.add-cart');
let produects=[
  {
    name:'Red Printed T-shirt',
    tag :'product-1',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-2',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-3',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-4',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-5',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-6',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-7',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-8',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-9',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-10',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-11',
    price:50,
    inCart:0
  },
  {
    name:'Red Printed T-shirt',
    tag :'product-12',
    price:50,
    inCart:0
  },
]
for (let i = 0; i < cars.length; i++) {
   cars[i].addEventListener('click',()=>{
    cartNumbers(produects[i]);
    totalCost(produects[i]);
   })
}
function onLoadcartNumbers(){
  let produectNumbers =localStorage.getItem('cartNumbers');
  if(produectNumbers){
    document.querySelector('.cart span').textContent = produectNumbers;
   }

}
function cartNumbers(produect){
  let produectNumbers =localStorage.getItem('cartNumbers');
  produectNumbers=parseInt(produectNumbers);

  if(produectNumbers){
   localStorage.setItem('cartNumbers', produectNumbers + 1);
   document.querySelector('.cart span').textContent = produectNumbers + 1;
  }else
  {
    localStorage.setItem('cartNumbers', 1);
    document.querySelector('.cart span').textContent = 1;
  }
  setItem(produect);
}
function setItem(produect){
    let cartItems = localStorage.getItem('produectsInCart');
    cartItems =JSON.parse(cartItems);
    if (cartItems != null) 
    {
      if (cartItems[produect.tag] == undefined) {
        cartItems={
          ...cartItems,
          [produect.tag]:produect

        }
      }
      cartItems[produect.tag].inCart += 1;  
    }
    else{
      produect.inCart=1;
       cartItems={
        [produect.tag]:produect
      }
    }
      localStorage.setItem('produectsInCart',JSON.stringify(cartItems));

}
function totalCost(produect){
  let cartCost =localStorage.getItem('totalCost');
  if (cartCost !=null) {
    cartCost =parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + produect.price);

  }
  else{
    localStorage.setItem('totalCost',produect.price)
  }
}
function displayCart(){
  let cartItems = localStorage.getItem('produectsInCart');
  cartItems =JSON.parse(cartItems);
  let produectContainer =document.querySelector(".products");
  let cartCost =localStorage.getItem('totalCost');
  if (cartItems && produectContainer) {
    produectContainer.innerHTML='';
    Object.values(cartItems).map(item =>{
        produectContainer.innerHTML += `
        <div class="product"> 
        <span class="fas fa-trash"></span>
         <img src="../image/shops/${item.tag}.jpg" style="width:100px ; height:100px ; " >
          <span> ${item.name}</span>
          </div>
          <div class="price">
           ${item.price}
          </div>
          <div class="quantity">
          <span>${item.inCart}</span>
          </div>
          <div class="total">
           $${item.inCart *item.price}.00
          </div>
          `;
    });
    produectContainer.innerHTML += `
    <div class="basketTotalContainer">
    <h4 class="basketTotalTitle"> 
    Basket Total
    </h4>
    <h4 class="basketTotal"> 
    $${cartCost}.00
    </h4>
    </div>

    `
  }
}

displayCart()
onLoadcartNumbers();