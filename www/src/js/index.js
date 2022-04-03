import "./../css/app.scss";
import {
  Recipe
} from "./recipe";
import {
  Individual
} from "./individual";

class App {
  constructor() {
    this.initApp();
  }

  initApp() {
    // Start application
    console.log(window.location.pathname);
    if (window.location.pathname == "/") {
      new Recipe();
    } else {
      new Individual();
    }
  }
}

new App();