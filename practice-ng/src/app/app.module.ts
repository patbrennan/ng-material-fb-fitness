import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';

@NgModule({
  declarations: [ // declare all components used in the project.
    AppComponent,
    ProductsComponent,
    ProductComponent
  ],
  imports: [ // imports other modules that add functionality
    BrowserModule,
    FormsModule,
  ],
  providers: [ // provide services here
  ],
  bootstrap: [AppComponent] // informs angular that AppComponent is the root/main component
})
export class AppModule { }
