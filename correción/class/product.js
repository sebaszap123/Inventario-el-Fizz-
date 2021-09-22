export default class Product {
    constructor(id, name, mount, price) {
      this.id = Number(id);
      this.name = name;
      this.mount = Number(mount);
      this.price = Number(price);
      this.valorMercancia = this.mount * this.price;
    }
    getId() {
      return this.id;
    }
    getName() {
      return this.name;
    }
    getPrice() {
      return this.price;
    }
    getMount() {
      return this.mount;
    }
    getTotalPrice() {
        return this.valorMercancia;
    }
}