import './../css/app.scss';
import {Image} from './image';

class App {
    constructor () {
        this.initApp();
    }

    initApp () {
      // Start application

      new Image();
    }
}

new App();