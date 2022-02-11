import $ from 'jquery';
import ImageTemplate from './hbs/image.hbs';
/*
 * Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
 * 3- Afficher la citation
 * */

export class Image {
    constructor() {
        this.initEls();
        this.initEvents();
    }

    initEls() {
        // Éléments non-jQuery
        this.els = {

            image: document.querySelector('.js-image'),
            Container: document.querySelector('.js-container'),
            image_User: document.querySelector('.js-image_User'),
        };

        // Éléments jQuery
        this.$els = {
            image: $('.js-image'),
            image_User: $('.js-image_User'),
            Container: $('.js-container'),
        };

        // Autres éléments

    }

    initEvents() {
        this.getImage();

    }

    getImage() {

        const api = {
            endpoint: 'https://api.unsplash.com/photos?client_id=4SEHFuCwJC8LLJ71HzCgJbTBeUriIOmI2B7Nu5y6Od4',
        };
        $.ajaxSetup({
            cache: false
        });
        $.getJSON(api.endpoint)
            .then((response) => {
                //console.log(response["urls"]["full"]);
                response.forEach(image => {
                    this.setImage(image);
                });
            })
            .catch((e) => {
                console.log(e);
            })
    }
    setImage(image) {

        const imageContent = image.urls.full;
        const imageUser = image.user.first_name + ' "' + image.user.username + '" ' + image.user.last_name;
        const imageTemplate = ImageTemplate({
            image,
            imageContent,
            imageUser,
        });
        this.$els.image.append(imageTemplate);
        this.$els.Container.addClass('is-ready');
    }
}