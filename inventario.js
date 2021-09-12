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
    let product = Product.createProduct();
    if (product) {
      this.limitInventaryPush(product);
    }
  };
  limitInventaryPush(product){
    if(this.inventary.length < 20){
      this.inventary.push(product);
      console.log(this.inventary)
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
  listing = () => {
    let product;
    this.remakeTable()
    for(var i=0; i<this.inventary.length; i++){
      if(this.inventary[i] !== null){
        product = this.inventary[i]
        this._showList(product)
      }
    }
  }

  listInverse = () => {
    var max = this.inventary.length
    var count = max
    this.remakeTable()
    for(var i=0; max>i; i++){
      count--
      if(this.inventary[count] !== null){
          this._showList(this.inventary[count])
      }
    }
}
remakeTable(){
  let table = document.querySelector("#list");
  table.innerHTML = '<tr><th id="product">Producto</th><th id="id">ID</th><th id="amount">Cantidad</th><th id="price">Precio</th><th id="totalPrice">Precio Total</th></tr>'
}
  _showList = (product) =>{
    console.log('itero')
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
  onUpdate = () => {

  }
  onDelete = () => {}
  onReplace = () => {}
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
    btnList.setAttribute('value', 'Listar')
    btnList.setAttribute('id', 'btnAcomodar')
    
    btnListInverse.setAttribute('type', 'button');
    btnListInverse.setAttribute('value','Listar Inverso');
    btnListInverse.setAttribute('id', 'btnListInverse');

    btnDelete.addEventListener('click', () => {
        this.onDelete();
        Swal.fire('Logrado', 'Producto eliminado', 'success');
        console.log(this._registry);
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
