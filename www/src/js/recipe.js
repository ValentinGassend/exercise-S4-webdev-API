import $ from "jquery";
import RecipeTemplate from "./hbs/recipe.hbs";
/*
 * Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
 * 3- Afficher la citation
 * */

export class Recipe {
    constructor() {
        this.initEls();
        this.initEvents();
    }
    initEls() {
        // Éléments non-jQuery
        this.els = {
            recipe: document.querySelector(".js-recipe"),
            Container: document.querySelector(".js-container"),

        };

        // Éléments jQuery
        this.$els = {
            recipe: $(".js-recipe"),
            Container: $(".js-container"),

        };

        // Autres éléments
    }

    initEvents() {
        this.getRecipe();
    }

    getRecipe() {
        const api = {
            endpoint: "https://api.spoonacular.com/recipes/random?number=10&apiKey=ce6fe5643b5349de9197c383470de83f",
        };
        $.ajaxSetup({
            cache: false,
        });
        $.getJSON(api.endpoint)
            .then((response) => {
                console.log(response.recipes);
                response.recipes.forEach((Recipes) => {
                    console.log(Recipes.id);
                    this.setRecipe(Recipes);
                });
            })
            .catch((e) => {
                console.log(e);
            });
    }
    setRecipe(recipe) {
        console.log(recipe.id);
        const recipeId = recipe.id;
        const recipeTitle = recipe.title;
        const recipeImage = recipe.image;
        const recipeTemplate = RecipeTemplate({
            recipeTitle,
            recipeId,
            recipeImage,
        });
        this.$els.recipe.append(recipeTemplate);
        this.$els.Container.addClass("is-ready");
    }
}