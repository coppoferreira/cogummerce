
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
      console.log("antes:"+cart[i].count+"\n"+"a adicionar:"+count);
      cart[i].count = parseInt(cart[i].count)+parseInt(count);
      console.log("depois:"+cart[i].count);
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

function displayCart(){
  var cartArray=listcart();
  var total=0;
  var output="<tr>";
  output+="<td height='19' width='20%'>"+"Tipo de Cogumelo"+"</td>";
  output+="<td height='19' width='20%'>"+"Preço"+"</td>";
  output+="<td colspan=2' width='40%' height='19'>"+"Quantidade"+"</td>";
  output+="<td height='19' width='20%'>"+"Total"+"</td>";
  output+="</tr>";

  //linha em branco separando
  output+="<tr>";
  output+="<td height='19' width='20%'></td>";
  output+="<td height='19' width='20%'></td>";
  output+="<td colspan='2' height='19' width='40%'></td>";
  output+="<td height='19' width='20%'></td>";
  output+="</tr>";


    for(var i in cartArray){
    output+="<tr>";
    output+="<td height='19' width='20%'>"+cartArray[i].name+"</td>";
    output+="<td height='19' width='20%'>"+cartArray[i].price+"</td>";
    output+="<td colspan='2' height='19' width='40%'>"+cartArray[i].count+"</td>";
    output+="<td height='19' width='20%'>"+(cartArray[i].price * cartArray[i].count)+"</td>";
    output+="</tr>";
    total+=(cartArray[i].price * cartArray[i].count);
  }
    output+="<tr>";
    output+="<td height='19' width='20%'></td>";
    output+="<td height='19' width='20%'></td>";
    output+="<td colspan='2' height='19' width='40%'></td>";
    output+="<td height='19' width='20%'></td>";
    output+="</tr>";

    output+="<tr>";
    output+="<td height='19' width='20%' class='text-center'>"+"Preço Total:"+"</td>";
    output+="<td height='19' width='20%'></td>";
    output+="<td colspan='2' height='19' width='40'></td>";
    output+="<td height='19' width='20%' >"+total+"</td>";
  $("#show-cart").html(output)
}

function savecart(){
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
}

function loadcart(){
  cart = JSON.parse(localStorage.getItem("shoppingcart" ));
}

function overlayOn(){
  document.getElementById("overlay").style.display = "block";
}

function overlayOff(){
  document.getElementById("overlay").style.display = "none";
}

//Preloder script
jQuery(window).load(function(){'use strict';

	// Slider Height
	var slideHeight = $(window).height();
	$('#home .carousel-inner .item, #home .video-container').css('height',slideHeight);

	$(window).resize(function(){'use strict',
		$('#home .carousel-inner .item, #home .video-container').css('height',slideHeight);
	});

});
