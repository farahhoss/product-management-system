var nameProductInput = document.getElementById("prodName");
var categoryProductInput = document.getElementById("prodCategory");
var priceProductInput = document.getElementById("prodPrice");
var descProductInput = document.getElementById("prodDes");
var searchProductInput = document.getElementById("search");
var addproduct = document.getElementById("addProduct");
var Updateproduct = document.getElementById("updateProd");
var productsList = [];
// localStorage.getItem to get item from el local storge b3d m3mlna set ll item fe e locat f h3ml disply tany 3shan tzhrly b3d el get;
if (localStorage.getItem("myproduct") != null) {
  productsList = JSON.parse(localStorage.getItem("myproduct"));
  displayInputs(productsList);
}

function main() {
  if (
    regularExpressionName() == true &&
    regularExpressionCategory() == true &&
    regularExpressionPrice() == true &&
    regularExpressionDesc() == true
  ) {
    getInputSData();
    displayInputs(productsList);
    clearInput();
  }
}

function getInputSData() {
  console.log(nameProductInput.value);

  var product = {
    name: nameProductInput.value,
    category: categoryProductInput.value,
    price: priceProductInput.value,
    description: descProductInput.value,
  };
  // console.log(product);
  productsList.push(product);
  localStorage.setItem("myproduct", JSON.stringify(productsList));
  // console.log(productsList);
  displayInputs(productsList);
  clearInput();
}

function displayInputs(array) {
  var box = "";
  for (var i = 0; i < array.length; i++) {
    box += `  <tr>
    <td>${i}</td>
    <td>${array[i].name}</td>
    <td>${array[i].category}</td>
    <td>${array[i].price}</td>
    <td>${array[i].description}</td>
    <td>
      <button onclick=" DeletProduct(${i})" class="btn btn-danger">
      <i class="fa-solid fa-trash"></i>
      </button>
      <button onclick=" showUpdate(${i})" class="btn firstbtn text-white"><i class="fa-solid fa-pen-to-square"></i></button>
    </td>
  
  </tr>
    `;
  }

  document.getElementById("tbody-id").innerHTML = box;
}
function clearInput() {
  nameProductInput.value = "";
  categoryProductInput.value = "";
  priceProductInput.value = "";
  descProductInput.value = "";
}
function DeletProduct(indexWantToDelet) {
  productsList.splice(indexWantToDelet, 1);
  localStorage.setItem("myproduct", JSON.stringify(productsList));
  displayInputs(productsList);
}

function searchOfProduct(searchText) {
  var matchedProduct = [];
  for (var i = 0; i < productsList.length; i++) {
    if (
      productsList[i].name.toLowerCase().includes(searchText.toLowerCase()) ==
      true
    ) {
      matchedProduct.push(productsList[i]);
    }
  }
  console.log(matchedProduct);
  displayInputs(matchedProduct);
}
// searchOfProduct(searchProductInput.value);
var productIndex = 0;
function showUpdate(index) {
  productIndex = index;
  addproduct.classList.replace("d-block", "d-none");
  Updateproduct.classList.replace("d-none", "d-block");
  nameProductInput.value = productsList[index].name;
  categoryProductInput.value = productsList[index].category;
  priceProductInput.value = productsList[index].price;
  descProductInput.value = productsList[index].description;
  window.scrollTo(0, 0); //bytl3ny fo2
}
function UpdateProductDisplayBtn() {
  Updateproduct.classList.replace("d-block", "d-none");
  addproduct.classList.replace("d-none", "d-block");
  productsList[productIndex].name = nameProductInput.value;
  productsList[productIndex].category = categoryProductInput.value;
  productsList[productIndex].price = priceProductInput.value;
  productsList[productIndex].description = descProductInput.value;
  localStorage.setItem("myproduct", JSON.stringify(productsList));
  displayInputs(productsList);
  clearInput();
}

function regularExpressionName() {
  var regex =
    /^[A-Z][a-z]{3,8}?\s?([0-9]{1,}|[a-z]{1,})?([0-9]{1,}|[a-z]{1,})$/;
  if (regex.test(nameProductInput.value) == true) {
    document.getElementById("not-valid-name").style.display = "none";
    return true;
  } else {
    document.getElementById("not-valid-name").style.display = "block";
  }
}
function regularExpressionCategory() {
  var regex = /^([A-Z]|[a-z]){3,8}?\s?[a-z]{1,20}$/;
  if (regex.test(categoryProductInput.value) == true) {
    document.getElementById("not-valid-cat").style.display = "none";
    return true;
  } else {
    document.getElementById("not-valid-cat").style.display = "block";
  }
}
function regularExpressionPrice() {
  var regex = /^\d{0,6}(\.\d{1,4})?$/;
  if (regex.test(priceProductInput.value) == true) {
    document.getElementById("not-valid-price").style.display = "none";
    return true;
  } else {
    document.getElementById("not-valid-price").style.display = "block";
  }
}
function regularExpressionDesc() {
  var regex = /^([A-Z]|[a-z])[a-z]{3,100}$/;
  if (regex.test(descProductInput.value) == true) {
    document.getElementById("not-valid-text").style.display = "none";
    return true;
  } else {
    document.getElementById("not-valid-text").style.display = "block";
  }
}
