import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private products = ['Book'];
  productsUpdated = new Subject();

  constructor() { }

  addProduct(productName: string) {
    this.products.push(productName);
     // emit event in service so components can subscribe & stay updated about products
    this.productsUpdated.next();
  }

  getProducts() {
    // ... essentially creates copy by pulling out existing elements & adding to new array
    // necessary since arrays pass by reference, and we want it to be a private property
    return [...this.products];
  }

  delete(productName: string) {
    this.products = this.products.filter( name => name !== productName);
    this.productsUpdated.next();
  }
}
