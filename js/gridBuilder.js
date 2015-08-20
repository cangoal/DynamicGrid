
var datasource1 = { "Products": [
                                {
                                  "prod_id" : "10103",
                                  "title":"Leather Brogue Ankle-Strap Sandal",
                                  "price": "$850.00"
                                },
                                {
                                  "prod_id" : "10102",
                                  "title":"Simple Patent Red Sole Pump, Black",
                                  "price": "$795.00",
                                  "sale_price": "$101.00"
                                },
                                {
                                  "prod_id" : "10101",
                                  "title":"Mini Miller Leather Logo Pump, with black perforated leather, 3.3in covered heel & Brogue detailing",
                                  "price": "$495.00",
                                  "sale_price": "$395.00"
                                },
                                {
                                  "prod_id" : "10104",
                                  "title":"Asymmetric Zip Wedge Boot, Navy",
                                  "price": "$695.00",
                                  "sale_price": "$202.00"
                                },
                                {
                                  "prod_id" : "10105",
                                  "title":"Riddlestone Check-Panel Rain Boot",
                                  "price": "$325.00"
                                }
                              ]
                };

var datasource2 = {
                    "10105": {
                      "brand" : "Burberry",
                      "img_url" : "http://images.neimanmarcus.com/ca/1/product_assets/X/2/V/1/Z/NMX2V1Z_mk.jpg"
                      },
                    "10102": {
                      "brand" : "Christian Louboutin",
                      "img_url" : "http://images.neimanmarcus.com/ca/1/product_assets/X/2/S/Q/8/NMX2SQ8_mk.jpg"
                      },
                    "10101": {
                      "brand" : "Tory Burch",
                      "img_url" : "http://images.neimanmarcus.com/ca/2/product_assets/X/2/T/A/G/NMX2TAG_mk.jpg"
                      },
                    "10103": {
                      "brand" : "Gucci",
                      "img_url" : "http://images.neimanmarcus.com/ca/2/product_assets/X/2/Q/R/5/NMX2QR5_mk.jpg"
                    },
                    "10104": {
                      "brand" : "Alexander McQueen",
                      "img_url" : "http://images.neimanmarcus.com/ca/2/product_assets/X/2/R/L/N/NMX2RLN_mk.jpg"
                    }
                  };

// merge two data sources
var mergeDataSources = function(obj1, obj2){
  var newObjects = [];
  for(var product in obj1.Products){
      var newObj = {};
      if(obj2[obj1.Products[product].prod_id]){
          for(var info1 in obj1.Products[product]){
            newObj[info1] = obj1.Products[product][info1];    
          }
          for( var info2 in obj2[obj1.Products[product].prod_id]){
            newObj[info2] = obj2[obj1.Products[product].prod_id][info2];
          }
      }
      newObjects.push(newObj);
  }
  return newObjects;
};

// prepare the merege objects
var mergedObjects = mergeDataSources(datasource1, datasource2);




// dynamic sort method
function dynamicSort(property){
  // default sort by price
  if(property == null){
     property = "price";
  }
  return function(obj1, obj2){
      if(obj1[property] == null){
        return 1;
      }
      if(obj2[property] == null){
        return 0;
      }
      if(obj1[property] < obj2[property]){
        return -1;
      } 
      if(obj1[property] > obj2[property]){
        return 1;
      }
      return 0; 
  }
};

// templates for each product
var HTMLproductContent = '<img class="image" src="%image%"/>'+
                          '<div style="clear:both"></div>'+
                          '<span class="brand">%brand%<br></span>'+
                          '<span class="title">%title%<br></span>'+
                          '<span class="price">%price%';
var HTMLproductSalePrice = '<span class="sale-price">NOW: %salePrice%</span>';

// generate all the products and add them into html
var generateProducts = function(sortByProp){
  // var products = mergeDataSources(datasource1, datasource2).sort(dynamicSort(sortByProp));
  var products = mergedObjects.sort(dynamicSort(sortByProp));
  console.log(products);
  for(var product in products){
    var node = document.createElement("li");
    node.className = "product";
    document.getElementById('products').appendChild(node);
    var productContent = "";
    productContent = HTMLproductContent.replace('%image%', products[product].img_url);
    productContent = productContent.replace('%brand%', products[product].brand);
    productContent = productContent.replace('%title%', products[product].title);
    productContent = productContent.replace('%price%', products[product].price);
    if(products[product].sale_price){
        productContent += HTMLproductSalePrice.replace('%salePrice%', products[product].sale_price);
    }
    productContent += '</span>'
    document.getElementById('products').lastChild.innerHTML = productContent;
  }
};

// call function 
generateProducts();




// add event listener for dynamic grid change
var gridSelector = document.getElementById('grid-selector');

gridSelector.addEventListener("change", function(){
    changeGrid(gridSelector.value);
});

// change grid by selecting column
function changeGrid(col){
  var products = document.getElementsByClassName('product');
  var width = (1 / col) * 100 + '%';
  console.log(width);
  for(var i=0; i<products.length; i++) {
    products[i].style.width = width;
  }
};

// add event listener for dynamic sort
var sortSelector = document.getElementById('sort-selector');

sortSelector.addEventListener("change", function(){
    document.getElementById('products').innerHTML = "";
    generateProducts(sortSelector.value);
    changeGrid(gridSelector.value);
});



