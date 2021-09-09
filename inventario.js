import Product from "./producto.js";
import TellActions from "./tellActions.js";
class Inventario {
  constructor() {
    let btnBrowser = document.querySelector("#btnBrowser");
    this.Browser = btnBrowser.addEventListener("click", this.browseProduct);
    let btnInpAdd = document.querySelector("#btnRegister");
    this.btnAddProduct = btnInpAdd.addEventListener("click", this.addProduct);
    this.inventary = new Array();
    this.tellActions = new TellActions()
  }
  awa() {
    document.createElement("h1");
    document.querySelector("#logo").innerHTML =
      "<P> AWA de owo ${this.uwu}</p>";
  }
  addProduct = () => {
    let product = Product.createProduct();
    if (product) {
      this.inventary.push(product);
      this.tellActions.tell(
        `producto agregado: ${product.getName()} con codigo: ${product.getId()}`
      );
      Swal.fire("Perfecto!", "Has agregado tu producto", "success");
    }
  };
  browseProduct = () => {
    let inpIdToBrowse = document.querySelector("#idBrowser");
    let idToBrowse = inpIdToBrowse.value;
    if (idToBrowse) {
      this.browser(idToBrowse);
      return true;
    }
    Swal.fire("Error", "No ingresaste ningun codigo", "error");
  };
  browser(id) {
    for (let i = 0; i < this.inventary.length; i++) {
      if (this.inventary[i].getId() === id) {
        Swal.fire(
          "En existencia",
          `producto: ${this.inventary[i].getName()}`,
          "success"
        );
        return this.inventary[i];
      }
    }
    Swal.fire('Error', 'El producto no existe', 'error')
    return false;
  }
}

new Inventario();
