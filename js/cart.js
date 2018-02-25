
//Shoppingcart functions

var cart = [];

var Item = function(name, price, count){
  this.name=name;
  this.price=price;
  this.count=count;

};

function addItemtocart(name, price, count){
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count += count;
      savecart();
      return;
    }
  }
  var item = new Item(name, price, count);
  cart.push(item);
  savecart();
}

function removeoneItemfromcart(name){
  for(var i in cart){
    if(cart[i].name === name){
      cart[i].count--;
      if(cart[i].count===0){
        cart.splice(i,1);
      }
      return;
    }
  }
}

function removeItemfromcartall(name){
  for(var i in cart){
    if(cart[i].name === name){
      cart.splice(i,1);
      return;
    }
  }
}

function clearcart(){
  cart=[];
}

function countcart(){
  var totalcount=0;
  for(var i in cart){
    totalcount+=cart[i].count;
  }

  return totalcount;
}

function totalcart(){
  var totalcost=0;
  for(var i in cart){
    totalcost+=cart[i].price *cart[i].count;
  }

  return totalcost.toFixed(2);
}

function listcart(){
  var cartcopy=[];
  for(var i in cart){
    var item=cart[i];
    var itemCopy={};
    for(var p in item ){
      itemCopy[p]=item[p];
    }
    itemCopy.total=(item.price * item.count).toFixed(2);
    cartcopy.push(itemCopy);
  }
  return cartcopy;
}

function savecart(){
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
}

function loadcart(){
  cart = JSON.parse(localStorage.getItem("shoppingcart" ));
}
