import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  productName = 'A Book';
  isDisabled = true;
  products = ['hammer', 'knives'];

  constructor() {
    setTimeout(() => {
      this.productName = 'A Tree';
      this.isDisabled = false;
    }, 3000);
   }

  ngOnInit() {
  }

  onAddProduct() {
    this.products.push(this.productName);
  }

  onRemoveProduct(name: string) {
    this.products = this.products.filter(p => p !== name);
  }

}
