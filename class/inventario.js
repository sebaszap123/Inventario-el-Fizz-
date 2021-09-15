import Product from "./producto.js";
import TellActions from "./tellActions.js";
class Inventario {
  constructor() {
    this.loadBtns()
    this.inventary = new Array();
    this.tellActions = new TellActions()
    let btnInpAdd = document.querySelector("#btnRegister");
    let btnList = document.querySelector("#btnAcomodar");
    let btnListInverse  = document.querySelector("#btnListInverse");
    let btnReplace = document.querySelector("#btnReplace")
    this.btnAddProduct = btnInpAdd.addEventListener("click", this.addProduct);
    btnList.addEventListener("click", this.listing)
    btnListInverse.addEventListener("click", this.listInverse)
    btnReplace.addEventListener('click', this.onReplace)
  }
  addProduct = () => {
    let passAdd = false;
    let product = Product.createProduct();
    if(product == isNaN){
      Swal.fire('Ups...','solo se admiten enteros para el id o codigo', 'error');
      return false;
    }
    if (product) {
      passAdd = this.limitInventaryPush(product);
    }
    if(!product){
      Swal.fire('Ups...', 'faltan datos por agregar', 'error');
    }
    if(passAdd) {
      this.inventary.push(product);
      this.tellActions.tell(`Se agrego el producto ${product.getName()} con el id: ${product.getId()}`)
      Swal.fire('Felicidades!', 'Agregaste un producto :3', 'success');
    }
    if(!passAdd) {
      this.tellActions.tell('No se agrego el producto');
      Swal.fire('Error', `El producto con el id: ${product.getId()} ya existe`, 'error')
    }
  };
  // No ocupan tellActions
  limitInventaryPush(product){
    if(this.inventary.length < 20){
      return this.noRepeatId(product);
    } else {
      this.tellActions.tell('Inventario Lleno')
      Swal.fire('Lo siento :c', 'El inventario comio demasiado', 'error')
      return false;
    }
   
  }
    // No ocupan tellActions
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
    this.tellActions.tell('Enlistado')
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
    this.tellActions.tell('Enlistado inverso') 
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
        this.tellActions.tell(`Se encontró el producto ${browseProduct.getName()}`)
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
    let idToChange = document.getElementById("id").value;
    let numUpdate = this.getPositionId(idToChange)
    console.log(idToChange)
    if(this.browser(idToChange)) {
      let product = Product.createProduct();
        if(product){
          this.tellActions.tell(`se reemplazo el producto ${this.inventary[numUpdate].getName()} por el nuevo ${product.getName()}`)
          this.inventary[numUpdate] = product;
          Swal.fire('Bien!', 'Se modifico el producto', 'success');
          this.listing()
          // AQUÍ ME QUEDE
          return;
        }else {
        Swal.fire('Error', 'Faltan datos del producto ', 'error')
      }
    } else {
      Swal.fire('Error', 'No existe este espacio en el inventario', 'error')
    }
  }
  onDelete = () => {
    let inpIdToDelete = document.querySelector("#idBrowser");
    let idToDelete = inpIdToDelete.value;
    if(!idToDelete){
      Swal.fire('Error', 'No ingresaste un codigo a eliminar', 'error')
    }
    if(!this.browser(idToDelete)){
      Swal.fire('Error', 'No existe el producto', 'error');
    }
    let position = this.getPositionId(idToDelete)
    let nextPosition = position + 1;
    console.log(position, nextPosition)
    while(nextPosition < this.inventary.length){
      let move = this.inventary[position]
      this.inventary[position] = this.inventary[nextPosition];
      this.inventary[nextPosition] = move
      position++;
      nextPosition++;
    }
    let eraser = this.inventary.pop()
    Swal.fire('Excelente', `El proudcto ${eraser.getName()} con el id: ${eraser.getId()} fue eliminado`, 'success');
    this.tellActions.tell(`El producto id:${eraser.getId()}, name: ${eraser.getName()} fue eliminado`, 'success');
  }
  getPositionId(id){
    for(let i = 0; i < this.inventary.length; i++){
      if(this.inventary[i].getId() == id){
        return i;
      }
    }
  }
loadBtns = () => {
  let column = document.querySelector("#btns")
  let colList = document.querySelector("#btnList")
    let btnDelete = document.createElement("input");
    let btnBrowser = document.createElement("input");
    let btnList = document.createElement("input");
    let btnListInverse = document.createElement("input");

    btnDelete.setAttribute('type', 'button');
    btnDelete.setAttribute('value', 'Eliminar');
    btnDelete.setAttribute("id", `btnDelete`);
    btnDelete.setAttribute("class", `button`);

    btnBrowser.setAttribute('type', 'button');
    btnBrowser.setAttribute('value', 'Buscar');
    btnBrowser.setAttribute("id", `btnBrowser`);
    btnBrowser.setAttribute("class", `button`);

    btnList.setAttribute('type', 'button');
    btnList.setAttribute('value', 'Listar Normal')
    btnList.setAttribute('id', 'btnAcomodar')
    btnList.setAttribute("class", `button`);
    
    btnListInverse.setAttribute('type', 'button');
    btnListInverse.setAttribute('value','Listar Inverso');
    btnListInverse.setAttribute('id', 'btnListInverse');
    btnListInverse.setAttribute("class", `button`);

    btnDelete.addEventListener('click', () => {
        this.onDelete();
    })
  btnBrowser.addEventListener('click', () => {
    this.browseProduct();
  })
  column.appendChild(btnDelete);
  column.appendChild(btnBrowser)
  colList.appendChild(btnList)
  colList.appendChild(btnListInverse)
}
}
new Inventario();
