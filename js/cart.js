
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
  var output="<table class='table table-borderless'>";
  output+="<thead>";
  output+="<tr>";
  //output+="<th scope='col'>#</th>";
  output+="<th scope='col'>Tipo do Cogumelo</th>";
  output+="<th scope='col'>Quantidade</th>";
  output+="<th scope='col'>Preço</th>";
  output+="<th scope='col'>Total</th>";
  output+="</tr>";
  output+="</thead>";


  // //linha em branco separando
  // output+="<tr>";
  // output+="<td height='19' width='20%'></td>";
  // output+="<td height='19' width='20%'></td>";
  // output+="<td colspan='2' height='19' width='40%'></td>";
  // output+="<td height='19' width='20%'></td>";
  // output+="</tr>";

    output+="<tbody>";
    for(var i in cartArray){
    output+="<tr>";
    output+="<td>"+cartArray[i].name+"</td>";
    output+="<td class='text-center'>"+cartArray[i].price+"</td>";
    output+="<td class='text-center'>"+cartArray[i].count+"</td>";
    output+="<td class='text-center'>"+(cartArray[i].price * cartArray[i].count)+"</td>";
    output+="</tr>";
    total+=(cartArray[i].price * cartArray[i].count);
  }

    output+="<tr>";
    output+="<td >"+"Preço Total:"+"</td>";
    output+="<td></td>";
    output+="<td></td>";
    output+="<td class='text-center'>"+total+"</td>";

    output+="</tbody>";
    output+="</table>";
    $('#finalizarCompra').css("display", "initial");
  $("#show-cart").html(output);
}

function savecart(){
  localStorage.setItem("shoppingcart", JSON.stringify(cart));
}

function loadcart(){
  cart = JSON.parse(localStorage.getItem("shoppingcart" ));
}

function overlayOff(){
  document.getElementById("overlay").style.display = "none";
}

jQuery('.visibility-cart').on('click',function(){

    var $btn =  $(this);
    var $cart = $('.cart');
    console.log($btn);

    if ($btn.hasClass('is-open')) {
        $btn.removeClass('is-open');
        $btn.text('O')
        $cart.removeClass('is-open');
        $cart.addClass('is-closed');
        $btn.addClass('is-closed');
    } else {
        $btn.addClass('is-open');
        $btn.text('X')
        $cart.addClass('is-open');
        $cart.removeClass('is-closed');
        $btn.removeClass('is-closed');
    }


});

jQuery('button.add1').on("click",function(e){
    e.preventDefault();
    var $this = $(this);
    var $input = $(' input.cogumelo1');
    var value = parseInt($input.val());
    //console.log(value);
    for(var i=0;i<3;i++){
        if($input[i].value>0){
            addItemtocart("Cogumelo "+i, 3, $input[i].value)
            $input[i].value=0;
        }
    }
});

jQuery('button.add2').on("click",function(e){
    e.preventDefault();
    var $this = $(this);
    var $input = $('.cogumelo2 input.cogumelo2');
    var value = parseInt($input.val());
    //console.log(value);
    for(var i=3;i<6;i++){
        if($input[( i-3)].value>0){
            addItemtocart("Cogumelo "+i, 2, $input[i-3].value)
            $input[(i-3)].value=0;
        }
    }
});

// SHOPPING CART PLUS OR MINUS
jQuery('a.qty-minus').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value > 1) {
        value = value - 1;
    } else {
        value = 0;
    }

    $input.val(value);

});

jQuery('a.qty-plus').on('click', function(e) {
    e.preventDefault();
    var $this = $(this);
    var $input = $this.closest('div').find('input');
    var value = parseInt($input.val());

    if (value < 100) {
        value = value + 1;
    } else {
        value =100;
    }

    $input.val(value);
});


jQuery("#fixedbutton").on('click', function(e){
    e.preventDefault();
    if(cart.length>0){
        displayCart();
    }
});

// RESTRICT INPUTS TO NUMBERS ONLY WITH A MIN OF 0 AND A MAX 100
jQuery('input').on('blur', function(){

    var input = $(this);
    var value = parseInt($(this).val());

    if (value < 0 || isNaN(value)) {
        input.val(0);
    } else if
    (value > 100) {
        input.val(100);
    }
});


jQuery('#finalizarCompra').on('click', function (e) {
    jQuery('#modalCarrinho').modal('hide');
    jQuery('#modalAgradecimento').modal('show');
});
