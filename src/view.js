export default class View {
  constructor(row) {
    this.row = row;
    
    this._onEditProduct();
  }
  
  _onEditProduct() {
    document.querySelector('.cart-body')
      .addEventListener('dblclick', (e) => {
        if (e.target.classList.contains('product-text')) {
          this.editProduct(e.target);
        }
      });
  }
  
  getProductInput() {
    return {
      title: document.querySelector('.add-title'),
      price: document.querySelector('.add-price'),
      quantity: document.querySelector('.add-quantity'),
    }
  }
  
  addProduct(product) {
    this.row.createCell(product);
  }
  
  removeProduct(id) {
    document.querySelector(`.cart-row[data-id=${id}]`).remove();
  }
  
  editProduct(target) {
    target.classList.add('product-text--editing');
    target.removeAttribute('readOnly');
  }
  
  saveEditProduct(target) {
    target.classList.remove('product-text--editing');
    target.setAttribute('readOnly', 'true');
  }
  
  updateProductAmount(id, amount) {
    document.querySelector(`.cart-row[data-id=${id}]`)
      .querySelector('.cell-amount')
      .textContent = amount;
  }
  
  updateTotalSum(totalSum) {
    document.querySelector('.totalSum').textContent = totalSum;
  }
  
  showCart() {
    document.querySelector('.cart-wrap').classList.add('cart-wrap--active');
  }
  
  hideCart() {
    document.querySelector('.cart-wrap').classList.remove('cart-wrap--active');
  }
  
  showPopup(title, handlerApply, handlerCancel) {
    const popup = document.querySelector('.popup');
    const popupOverlay = document.querySelector('.popup-overlay');
    const popupProduct = document.querySelector('.popup-product');
    const btnApply = document.querySelector('.btn-apply');
    const btnCancel = document.querySelector('.btn-cancel');
    
    popup.classList.add('popup--active');
    popupOverlay.classList.add('popup-overlay--active');
    
    popupProduct.textContent = `"${title}"`;
    
    btnApply.addEventListener('click', () => {
      handlerApply && handlerApply();
      this._closePopup();
    });
    
    btnCancel.addEventListener('click', () => {
      handlerCancel && handlerCancel();
      this._closePopup();
    });
  }
  
  _closePopup() {
    const popup = document.querySelector('.popup');
    const popupOverlay = document.querySelector('.popup-overlay');
    
    popup.classList.remove('popup--active');
    popupOverlay.classList.remove('popup-overlay--active');
  }
  
  validationInput(product) {
    let isValid = null;
    
    Object.entries(product).forEach(item => {
      const addingError = document.querySelector(`.${item[0]}-wrap`)
        .querySelector('.adding-error');
      const add = document.querySelector(`.add-${item[0]}`);
      
      if (item[1].value.length === 0) {
        addingError.classList.add('adding-error--active');
        add.classList.add('add--error');
        
        isValid = false;
      } else {
        addingError.classList.remove('adding-error--active');
        add.classList.remove('add--error');
        
        isValid = true;
      }
    });
    
    return isValid;
  }
  
  clearInput(product) {
    for (let key in product) {
      product[key].value = '';
    }
  }
  
  bindAddProduct(handler) {
    document.querySelector('.add')
      .addEventListener('click', (e) => {
        e.preventDefault();
        
        this.validationInput(this.getProductInput()) === true ? handler(this.getProductInput()) : false;
      });
  }
  
  bindRemoveProduct(handler) {
    document.querySelector('.cart-body')
      .addEventListener('click', (e) => {
        if (e.target.classList.contains('cell-delete')) {
          const cartRowId = e.target.closest('.cart-row').dataset.id;
          
          handler(cartRowId);
          this.removeProduct(cartRowId);
        }
      });
  }
  
  bindSaveEdit(handler) {
    document.querySelector('.cart-body')
      .addEventListener('blur', (e) => {
        const target = e.target;
        
        if (target.classList.contains('product-text')) {
          const cartRow = target.closest('.cart-row');
          
          handler(cartRow.dataset.id, target.dataset.name, target.value);
          this.saveEditProduct(target);
        }
      }, true);
  }
}