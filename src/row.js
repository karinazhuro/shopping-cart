export default class Row {
  createCell(product) {
    const {title, price, quantity} = product;
    const amount = product.amount();
    
    const cartBody = document.querySelector('.cart-body');
    
    const row = document.createElement('tr');
    const tdTitle = document.createElement('td');
    const tdPrice = document.createElement('td');
    const tdQuantity = document.createElement('td');
    const tdAmount = document.createElement('td');
    const tdDelete = document.createElement('td');
  
    const inputTitle = document.createElement('input');
    const inputPrice = document.createElement('input');
    const inputQuantity = document.createElement('input');
  
    row.classList.add('cart-row');
    row.dataset.id = title;
    cartBody.append(row);
    
    tdTitle.classList.add('cell');
    tdTitle.classList.add('cell-title');
    row.append(tdTitle);
  
    inputTitle.classList.add('product-text');
    inputTitle.dataset.name = 'title';
    inputTitle.value = title;
    inputTitle.setAttribute('readOnly', 'true');
    tdTitle.append(inputTitle);
  
    tdPrice.classList.add('cell');
    tdPrice.classList.add('cell-price');
    row.append(tdPrice);
  
    inputPrice.classList.add('product-text');
    inputPrice.dataset.name = 'price';
    inputPrice.value = price;
    inputPrice.setAttribute('readOnly', 'true');
    tdPrice.append(inputPrice);
  
    tdQuantity.classList.add('cell');
    tdQuantity.classList.add('cell-quantity');
    row.append(tdQuantity);
  
    inputQuantity.classList.add('product-text');
    inputQuantity.dataset.name = 'quantity';
    inputQuantity.value = quantity;
    inputQuantity.setAttribute('readOnly', 'true');
    tdQuantity.append(inputQuantity);
  
    tdAmount.classList.add('cell');
    tdAmount.classList.add('cell-amount');
    tdAmount.textContent = amount;
    row.append(tdAmount);
    
    tdDelete.classList.add('cell');
    tdDelete.classList.add('cell-delete');
    tdDelete.classList.add('material-icons');
    tdDelete.classList.add('material-icons-round');
    tdDelete.classList.add('md-dark');
    tdDelete.textContent = 'delete';
    row.append(tdDelete);
  }
}