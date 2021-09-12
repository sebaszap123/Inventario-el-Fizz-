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
    this.btnTest = document.getElementById("btnTest")
    this.btnTest.addEventListener("click", this.listar)
  }
  addProduct = () => {
    let product = Product.createProduct();
    if (product) {
      this.limitInventaryPush(product);
    }
  };
  limitInventaryPush(product){
    if(this.inventary.length < 20){
      this.inventary.push(product);
      this.tellActions.tell(
        `producto agregado: ${product.getName()} con codigo: ${product.getId()}`
      );
      Swal.fire("Perfecto!", "Has agregado tu producto", "success");
    }else {
      Swal.fire("Error!", "Ya no quedaespacio en el inventario", "error");
      console.log(this.inventary)
    }
  }
  browseProduct = () => {
    let inpIdToBrowse = document.querySelector("#idBrowser");
    let idToBrowse = inpIdToBrowse.value;
    if (idToBrowse) {
      this.browser(idToBrowse);
      return true;
    }
    Swal.fire("Error", "No ingresaste ningun codigo", "error");
  };
  // Funciona para agregar los datos a la tabla (sin iterar) tal vez con 1 se registran normal y con -1 se registra inverso? (con el row?)
  listar = () => {
    let product;
    this.remakeTable()
    for(var i=0; i<this.inventary.length; i++){
      if(this.inventary[i] !== null){
        product = this.inventary[i]
        this._showList(product)
      }
    }
  }
  listarInverso(){
    let product;
    var max = this.inventary.length
    this.remakeTable()
    for(var i=0; max>i; i--){
      if(this.inventary[i] !== null){
        product = this.inventary[i]
        this._showList(product)
      }
  }
}
remakeTable = () =>{
  let table = document.querySelector("#list");
  table.innerHTML = '<tr><th id="product">Producto</th><th id="id">ID</th><th id="amount">Cantidad</th><th id="price">Precio</th><th id="totalPrice">Precio Total</th></tr>'
}
  _showList = (product) =>{
        let table = document.querySelector("#list");
        let row = table.insertRow(1);
        let colName = row.insertCell(0);
        let colId = row.insertCell(1);
        let colMount = row.insertCell(2);
        let colPrice = row.insertCell(3)
        let colTotalPrice = row.insertCell(4);
        row.setAttribute('id', `row${product.getId()}`);
        colName.setAttribute('id', `colName${product.getId()}`);
        colId.setAttribute('id', `colId${product.getId()}`);
        colMount.setAttribute('id', `colMount${product.getId()}`);
        colPrice.setAttribute('id', `colPrice${product.getId()}`);
        colTotalPrice.setAttribute('id', `colTotalPrice${product.getId()}`);

        colName.innerHTML = product.getName();
        colId.innerHTML = product.getId();
        colMount.innerHTML = product.getMount();
        colPrice.innerHTML = product.getPrice();
        colTotalPrice.innerHTML = product.getMount() * product.getPrice();
  }
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

