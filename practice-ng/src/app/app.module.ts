import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products/products.component';
import { ProductComponent } from './products/product/product.component';
import { ProductsService } from './products/products.service';
import { HomeComponent } from './home.component';

@NgModule({
  declarations: [ // declare all components used in the project.
    AppComponent,
    ProductsComponent,
    ProductComponent,
    HomeComponent,
  ],
  imports: [ // imports other modules that add functionality
    BrowserModule,
    FormsModule,
    AppRoutingModule,
  ],
  providers: [ // provide services here
    ProductsService,
  ],
  bootstrap: [AppComponent] // informs angular that AppComponent is the root/main component
})
export class AppModule { }
