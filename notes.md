# Angular w/Material & Firebase

Fitness tracking application notes

### Angular Material

This is an Angular Component Suite that are prebuilt & styled to the material design spec. There are **a) component building utilities** and **b) concrete component implementations** included with the material packages.

a) `@angular/cdk` (component development kit) - not styling; utily & helper methods/classes for rendering overlays, positioning, unstyled components, etc. Always will use both when working w/material.

b) `@angular/material` - prestyled, completely implemented. uses cdk as a dependency

> For steps on installing & using material, see the [official documentation guide](https://material.angular.io/guide/getting-started)

**NOTE:** If you have more than 1 module in your src/app folder, and you're trying to use the cli to create a component, you should specify `ng g c auth/signup --module app.module` or the cli will be confused about where to create the new component folder & files.

**NOTE:** Check out [Angular flex layout](https://github.com/angular/flex-layout); a package for using a css flexbox system in your Ng/Material apps. Use `npm install --save @angular/flex-layout`

Pure flexbox example for reference:

```css
#container {
  display: flex;
  width: 100%;
  height: 700px;
  border: 1px solid black;
  flex-direction: row; /* defines the main axis */
  justify-content: flex-start; /* main axis */
  align-items: center;  /* cross-axis */
}

.child {
  width: 200px;
  height: 200px;
  /* flex: 1; */ /* defines how much space it takes */
}

#child1 {
  background-color: red;
  /* flex: 2; */
}

#child2 {
  background-color: green;
}

#child3 {
  background-color: blue;
}
```

Install ngrx: `npm install --save @ngrx/store`




