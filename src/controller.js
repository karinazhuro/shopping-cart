export default class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
    
    view.bindAddProduct(this.addItem.bind(this));
    view.bindRemoveProduct(this.showPopup.bind(this));
    view.bindSaveEdit(this.saveItem.bind(this));
  }
  
  addItem(product) {
    const {title, price, quantity} = product;
    
    const item = {
      title: title.value,
      price: price.value,
      quantity: quantity.value,
      id: title.value,
      amount() {
        return this.price * this.quantity;
      }
    };
    
    this.model.addProduct(item);
    this.view.clearInput(product);
    this.view.addProduct(item);
    this.view.updateTotalSum(this.model.calculateTotalSum());
    
    if (Object.values(this.model.products).length === 1) {
      this.view.showResult();
    }
  }
  
  showPopup(id) {
    this.view.showPopup(this.model.products[id].title, () => this.applyRemove(id));
  }
  
  applyRemove(id) {
    this.model.removeProduct(id);
    this.view.updateTotalSum(this.model.calculateTotalSum());
  
    if (Object.values(this.model.products).length === 0) {
      this.view.hideResult();
    }
  }
  
  saveItem(target, id) {
    this.model.editProduct(target, id);
    
    this.view.countProduct(id, this.model.products[id].amount());
    this.view.updateTotalSum(this.model.calculateTotalSum());
  }
}