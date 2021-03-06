import Carousel from "../../1-module/2-task/index.js";
import slides from "../../1-module/2-task/slides.js";

import RibbonMenu from "../../2-module/1-task/index.js";
import categories from "../../2-module/1-task/categories.js";

import StepSlider from "../../2-module/4-task/index.js";
import ProductsGrid from "../../3-module/2-task/index.js";

import CartIcon from "../../3-module/1-task/index.js";
import Cart from "../../3-module/4-task/index.js";


export default class Main {
  constructor() {}

  async render() {
    let response = await fetch("products.json");
    let data = await response.json();

    this.carousel = new Carousel(slides);
    document
      .querySelector("[data-carousel-holder]")
      .append(this.carousel.elem);

    this.ribbonMenu = new RibbonMenu(categories);
    document
      .querySelector("[data-ribbon-holder]")
      .append(this.ribbonMenu.elem);

    this.stepSlider = new StepSlider({ steps: 5, value: 3 });
    document
      .querySelector("[data-slider-holder]")
      .append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    document
      .querySelector("[data-cart-icon-holder]")
      .append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    document
      .querySelector("[data-products-grid-holder]")
      .innerHTML = "";

    this.productsGrid = new ProductsGrid(data);
    document
      .querySelector("[data-products-grid-holder]")
      .append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById("nuts-checkbox").checked,
      vegeterianOnly: document.getElementById("vegeterian-checkbox").checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbonMenu.value,
    });

    document.body.addEventListener("product-add", (event) => {
      let product = data.find((elem) => event.detail === elem.id);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener("slider-change", (event) => {
      this.productsGrid.updateFilter({
        maxSpiciness: event.detail, 
      });
    });

    this.ribbonMenu.elem.addEventListener("ribbon-select", (event) => {
      this.productsGrid.updateFilter({
        category: event.detail, 
      });
    });
    document
      .getElementById("nuts-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          noNuts: event.target.checked, 
        });
      });
    document
      .getElementById("vegeterian-checkbox")
      .addEventListener("change", (event) => {
        this.productsGrid.updateFilter({
          vegeterianOnly: event.target.checked, 
        });
      });
  }
}
