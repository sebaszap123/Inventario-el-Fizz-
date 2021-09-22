export default class Ux{
    constructor(divTable, divActions, inventary){
        this.div = divTable;
        this.divActions = divActions;
        this.inventary = inventary;
    }
    cleanTable(){
      let table = document.getElementById('tbProducts');
      table.innerHTML = '<tr><th id="product">Producto</th><th id="id">ID</th><th id="amount">Cantidad</th><th id="price">Precio</th><th id="totalPrice">Precio Total</th></tr>'
    }
    _showProduct(product){
      if(product){
        let table = document.getElementById('tbProducts')
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
        colTotalPrice.innerHTML = product.getTotalPrice();
      }
    }
    listing(){
      this.cleanTable()
        if(this.inventary.length !== 0){
          for(var i=0; i<this.inventary.length; i++){
            if(this.inventary[i] !== null){
              let product = this.inventary[i]
              this._showProduct(product)
            }
          }
        }
    }
    
      listInverse(){
        var max = this.inventary.length
        var count = max
        this.cleanTable()
        if(this.inventary.length !== 0){
          for(var i=0; max>i; i++){
            count--
            if(this.inventary[count] !== null){
                this._showProduct(this.inventary[count])
            }
          }
        }
    }
    tellActions(action){
      this.divActions.innerHTML += `<label>${action}</label>`
    }
}