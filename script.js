
function domobj(){
  var self        =this;
  self.products   = [];

  self.getproducts = function(url){
    $.getJSON(url, function(response){
        for(i=0; i<response.sales.length ; i++){
          self.products.push( new productobj(response.sales[i], i)  );
        }
    });
  }
  // bottle neck 
  self.updateproducthtml = function(){
    for( i=0; i< self.products.length ; i++){
      self.products[i].updatehtml();
    }
  }
  
  self.updatedom = function(){
    var i = 0
    thishtml='';
    for( i = 0; i< self.products.length ; i++){
      if (i % 3 == 0 ){  
        thishtml += "<div class='row'>"; 
      }
      
      thishtml += self.products[i].htmlview;

      if ((i % 3 == 2) || i == (self.products.length - 1) ){
        thishtml += "</div>";
      }
    }
    $("#content").append(thishtml);

    // script used to add class of cf during dom update so row is clearfixed
    $(".row").addClass('cf');
  }
  
}
// end of bottle neck 

function productobj(product, i){
  var self          = this;
  self.photo        = product.photos.medium_half
  self.title        = product.name
  self.tagline      = product.tagline
  self.description  = product.description 
  self.url          = product.url
  self.htmlview     = ""
  self.index        = i
  self.custom_class = "col"+ ((i % 3) +1)
  
  self.updatehtml = function(){
    $.get('product-template.html', function(template){
      self.htmlview = template.replace('{image}', self.photo).replace('{title}', self.title).replace('{tagline}', self.tagline).replace('{url}', self.url).replace('{custom_class}', self.custom_class).replace('{description}', self.description);
    });
  }
}

var page = new domobj();
page.getproducts('data.json');
setTimeout("console.log('building html'); page.updateproducthtml();",200);
setTimeout("page.updatedom()",500);

// Code Challenge scripts //

// overlay mouseover effect
$(document).on('mouseenter','.product-container', function(){ 
  $(".desc_overlay",this).css("display", "block");
  $(".close_out",this).css("display", "block");
});

$(document).on('mouseleave','.product-container', function(){ 
  $(".desc_overlay",this).css("display", "none"); 
  $(".close_out",this).css("display", "none"); 
});

//removing product element on X
$(document).on('click','.close_out', function(){
   $(this).parents('.product-container').fadeOut(); 
});




