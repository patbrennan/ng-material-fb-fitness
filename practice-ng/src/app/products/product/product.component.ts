import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() name: string; // receive data from outside
  @Input() price: number;
  @Output() productClicked = new EventEmitter(); // pass data to outside

  constructor(private productsService: ProductsService) { }

  ngOnInit() {
  }

  onClicked() {
    // this.productClicked.emit();
    this.productsService.delete(this.name);
  }

}
