export default class Model {
  constructor() {
    this.products = {};
  }
  
  addProduct(product) {
    this.products[product.id] = product;
  }
  
  removeProduct(id) {
    delete this.products[id];
  }
  
  editProduct(target, id) {
    this.products[id][target.dataset.name] = target.value;
  }
  
  calculateTotalSum() {
    return Object.values(this.products).reduce((sum, item) => {
      return sum + item.amount();
    }, 0);
  }
}