import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @Input() name: string; // receive data from outside
  @Input() price: number;
  @Output() productClicked = new EventEmitter(); // pass data to outside

  constructor() { }

  ngOnInit() {
  }

  onClicked() {
    this.productClicked.emit();
  }

}
