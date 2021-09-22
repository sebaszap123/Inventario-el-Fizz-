export default class Inventario{
    constructor(){
        this.inventary = new Array();
    }
    getArray(){
      return this.inventary;
    }
    add(product){
      let added = false;
      if(this.inventary.length <= 0){
        added = this.inventary.push(product);
      } else if(this.inventary.length < 20){
        let pass = this.noRepeatId(product);
        if(pass === true){
          added = this.inventary.push(product);
        }
      } else {
        added = null;
      }
      return added;
    }
    insertProduct(product, pos) {
      if(!this.limitSize(pos)){
        return false;
      }
      let max = this.inventary.length + 1; //
      let cPos = pos - 1;
      for(; max > cPos; max--){
        this.inventary[max] = this.inventary[max - 1];
      }
      this.inventary[cPos] = product;
      return true;
    }
    limitSize(num){
      if(num <= 0){
        alert('La posición 0 no existe (1, 2, n)')
        return false;
      }
      if(num > this.inventary.length){
        alert('No se puede insertar en a posición que no existe');
        return false;
      }
      return true;
    }
    browseId(id) {
        id = Number(id);
        let item = null;
        for (let i = 0; i < this.inventary.length; i++) {
          if (this.inventary[i].getId() == id) {
            item = this.inventary[i]
          }
        }
        return item;
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
    deleteProduct(idToDelete){
    if(!idToDelete){
      return null;
    }
    if(!this.browseId(idToDelete)){
      return false;
    }
    let position = this.getPositionId(idToDelete)
    let nextPosition = position + 1;
    while(nextPosition < this.inventary.length){
      let move = this.inventary[position]
      this.inventary[position] = this.inventary[nextPosition];
      this.inventary[nextPosition] = move
      position++;
      nextPosition++;
    }
    return this.inventary.pop()
    }
    getPositionId(id){
      for(let i = 0; i < this.inventary.length; i++){
        if(this.inventary[i].getId() == id){
          return i;
        }
      }
    }
}