import Product from "./producto.js";
import TellActions from "./tellActions.js";
class Inventario {
  constructor() {
    this.loadBtns()
    this.inventary = new Array();
    this.tellActions = new TellActions()
    let btnInpAdd = document.querySelector("#btnRegister");
    this.btnAddProduct = btnInpAdd.addEventListener("click", this.addProduct);
    let btnList = document.querySelector("#btnAcomodar");
    let btnListInverse  = document.querySelector("#btnListInverse");
    btnList.addEventListener("click", this.listing)
    btnListInverse.addEventListener("click", this.listInverse)
  }
  addProduct = () => {
    let passAdd = false;
    let product = Product.createProduct();
    if (product) {
      passAdd = this.limitInventaryPush(product);
    }
    if(passAdd) {
      this.inventary.push(product);
      this.tellActions(`Se agrego el producto ${product.getName()} con el id: ${product.getId()}`)
      Swal.fire('Felicidades!', 'Agregaste un producto :3', 'success')
    }
  };
  limitInventaryPush(product){
    if(this.inventary.length < 20){
      return this.noRepeatId(product);
    }
    this.tellActions.tell('Inventario Lleno')
    Swal.fire('Lo siento :c', 'El inventario comio demasiado', 'error')
    return false;
  }
  noRepeatId(product){
    let pass = true;
    for(let i=0; i<this.inventary.length; i++){
      if(this.inventary[i].getId() === product.getId()){
        pass = false;
      }
    }
    return pass
  }
  // Funciona para agregar los datos a la tabla (sin iterar) tal vez con 1 se registran normal y con -1 se registra inverso? (con el row?)
  listing = () => {
    let product;
    this.remakeTable()
    if(this.inventary.length !== 0){
      for(var i=0; i<this.inventary.length; i++){
        if(this.inventary[i] !== null){
          product = this.inventary[i]
          this._showList(product)
        }
      }
    }
  }

  listInverse = () => {
    var max = this.inventary.length
    var count = max
    this.remakeTable()
    if(this.inventary.length !== 0){
      for(var i=0; max>i; i++){
        count--
        if(this.inventary[count] !== null){
            this._showList(this.inventary[count])
        }
      }
    }
}
remakeTable(){
  let table = document.querySelector("#list");
  table.innerHTML = '<tr><th id="product">Producto</th><th id="id">ID</th><th id="amount">Cantidad</th><th id="price">Precio</th><th id="totalPrice">Precio Total</th></tr>'
}
  _showList = (product) =>{
        let table = document.querySelector("#list");
        let row = table.insertRow(-1);
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
  browseProduct = () => {
    let inpIdToBrowse = document.querySelector("#idBrowser");
    let idToBrowse = inpIdToBrowse.value;
    if (idToBrowse) {
      let browseProduct = this.browser(idToBrowse);
      if(browseProduct !== false && browseProduct !== undefined){
        Swal.fire(
          "En existencia",
          `producto: ${browseProduct.getName()}`,
          "success"
        );
      }else if(!browseProduct){
        Swal.fire(
          "Lo sentimos :c",
          `el producto con id: ${idToBrowse}, no existe`,
          "error"
        );
      }
    } else {
      Swal.fire("Error", "No ingresaste ningun codigo", "error");
    }
  };

  browser(id) {
    for (let i = 0; i < this.inventary.length; i++) {
      if (this.inventary[i].getId() === id) {
        return this.inventary[i]
      }
    }
    return false;
  }
  onReplace = () => {
    let update = document.querySelector("#update");
    let numUpdate = update.value -1;
    if((this.inventary.length) >= numUpdate) {
      let product = Product.createProduct();
      if(numUpdate !== "" && numUpdate !== -1 && product !== false){
        if(product){
          this.inventary[numUpdate] = product;
          Swal.fire('Bien!', 'Se modifico el producto', 'success')
          return;
        }
      } else {
        Swal.fire('Error', 'Faltan datos del producto ', 'error')
      }
    } else {
      Swal.fire('Error', 'No existe este espacio en el inventario', 'error')
    }
  }
  onDelete = () => {
    let inpIdToBrowse = document.querySelector("#idBrowser");
    let idToBrowse = inpIdToBrowse.value;
    if (idToBrowse) {
      let browseProduct = this.browser(idToBrowse);
      if(browseProduct !== false && browseProduct !== undefined){
        console.log(browseProduct)
        this.deleteProduct(browseProduct)
      }else if(!browseProduct){
        Swal.fire(
          "Lo sentimos :c",
          `el producto con id: ${idToBrowse}, no necesita ser borrado, porque no existe, como el amor de ella`,
          "error"
        );
      }
    } else {
      Swal.fire("Error", "No ingresaste ningun codigo", "error");
    }
  }
  deleteProduct = (product) => {
    var poped;
    var arrayPoped = new Array();
    let max = this.inventary.length
    for(let i = -1; i < max; i++){
      max--
      if(this.inventary[max].getId() == product.getId()){
        this.tellActions.tell(`Se elimino el producto ${product.getName()} con el id: ${product.getId()}`)
        this.inventary.pop()
      }
      poped = this.inventary.pop();
      arrayPoped.push(poped); 
    }
    this.inventary = arrayPoped;
  }
  invertArray = (array, max) =>{
    
  }
  loadBtns = () => {
  let column = document.querySelector("#btns")
  let colOnUpdate = document.querySelector("#btnOnUpdate")
  let colList = document.querySelector("#btnList")
    let btnDelete = document.createElement("input");
    let btnReplace = document.createElement("input");
    let btnBrowser = document.createElement("input");
    let btnList = document.createElement("input");
    let btnListInverse = document.createElement("input");

    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('value', 'Eliminar');
    btnDelete.setAttribute("id", `btnDelete`);

    btnReplace.setAttribute('type', 'button');
    btnReplace.setAttribute('value', 'Modificar');
    btnReplace.setAttribute("id", `btnReplace`)

    btnBrowser.setAttribute('type', 'button');
    btnBrowser.setAttribute('value', 'Buscar');
    btnBrowser.setAttribute("id", `btnBrowser`)

    btnList.setAttribute('type', 'button');
    btnList.setAttribute('value', 'Listar Normal')
    btnList.setAttribute('id', 'btnAcomodar')
    
    btnListInverse.setAttribute('type', 'button');
    btnListInverse.setAttribute('value','Listar Inverso');
    btnListInverse.setAttribute('id', 'btnListInverse');

    btnDelete.addEventListener('click', () => {
        this.onDelete();
    })
    btnReplace.addEventListener('click', () => {
      this.onReplace();
  });
  btnBrowser.addEventListener('click', () => {
    this.browseProduct();
  })

  colOnUpdate.appendChild(btnReplace);
    column.appendChild(btnDelete);
    column.appendChild(btnBrowser)
    colList.appendChild(btnList)
    colList.appendChild(btnListInverse)
}
}
new Inventario();
