import { Component, OnInit, OnDestroy } from '@angular/core';
import { ProductsService } from './products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {
  productName = 'A Book';
  isDisabled = true;
  products = [];
  private productsSubscription: Subscription;

  constructor(private productsService: ProductsService) {
    setTimeout(() => {
      this.isDisabled = false;
    }, 2000);
   }

  ngOnInit() {
    this.products = this.productsService.getProducts();
     // keep informed about changes to products
    this. productsSubscription = this.productsService.productsUpdated.subscribe( () => {
      this.products = this.productsService.getProducts();
    });
  }

  ngOnDestroy() {
    // clear up resources & prevent memory leaks:
    this.productsSubscription.unsubscribe();
  }

  onAddProduct(form) {
    if (form.valid) {
      this.productsService.addProduct(form.value.productName);
    }
  }

  onRemoveProduct(name: string) {
    this.products = this.products.filter(p => p !== name);
  }

}
