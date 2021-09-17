export default class Product {
  constructor(id, name, mount, price, valorMercancia) {
    this.id = id;
    this.name = name;
    this.mount = mount;
    this.price = price;
    this.valorMercancia = valorMercancia;
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
  static createProduct() {
    let inpId = document.querySelector("#id");
    let inpName = document.querySelector("#name");
    let inpMount = document.querySelector("#mount");
    let inpPrice = document.querySelector("#price");
    let id = inpId.value;
    let name = inpName.value;
    let mount = inpMount.value;
    let price = inpPrice.value;
    if((id % 1 == 0 && id >= 0)) {
      if (id && name && mount && price) {
        let valorMercancia = mount * price;
        let product = new Product(id, name, mount, price, valorMercancia);
        inpId.value = "";
        inpName.value = "";
        inpMount.value = "";
        inpPrice.value = "";
        return product;
      } else {
        return false;
      }
    } else {
      return isNaN
    }

  }
}
