import $ from "jquery";
import Indiv_leftsideTemplate from "./hbs/indiv-leftside.hbs";
import Indiv_rightsideTemplate from "./hbs/indiv-rightside.hbs";
import Indiv_leftside_secondpartTemplate from "./hbs/indiv-leftside_secondpart.hbs";
import Indiv_rightside_secondpartTemplate from "./hbs/indiv-rightside_secondpart.hbs";
import Indiv_IngredientsTemplate from "./hbs/indiv-Ingredients.hbs";
/*
 * Objectif : récupérer une citation aléatoire à partir d'une API et l'afficher
 *
 * Étapes :
 * 1- Créer une référence vers les éléments du DOM qu'on va utiliser
 * 2- Récupérer une citation aléatoire à partir de l'API de QuotesOnDesign (https://quotesondesign.com/api/)
 * 3- Afficher la citation
 * */

export class Individual {
  constructor() {
    this.initEls();
    this.initEvents();
  }
  initEls() {
    // Éléments non-jQuery
    this.els = {
      indiv_leftside: document.querySelector(".indiv-leftside"),
      indiv_rightside: document.querySelector(".indiv-rightside"),
      Container: document.querySelector(".js-container"),
      recipe_User: document.querySelector(".js-recipe_User"),
    };

    // Éléments jQuery
    this.$els = {
      indiv_leftside: $(".js-indiv-leftside"),
      indiv_rightside: $(".js-indiv-rightside"),
      indiv_leftside_secondpart: $(".js-indiv-leftside_secondpart"),
      indiv_rightside_secondpart: $(".js-indiv-rightside_secondpart"),
      indiv_all_elements: $(".js-all-ingredients"),
      recipe_User: $(".js-recipe_User-indiv"),
      Container: $(".js-container-indiv"),
      indiv_all_equipment: $('.js-all-equipment'),
    };

    // Autres éléments
  }

  initEvents() {
    this.getIndividual();
    this.getSimilar();
  }

  getIndividual() {
    const urlParams = new URLSearchParams(document.location.search);
    const recipeId = urlParams.get("id");
    console.log(recipeId);
    const api = {
      endpoint: "https://api.spoonacular.com/recipes/" +
        recipeId +
        "/information?apiKey=f0d6a251b326433889bdd28d52da4a72",

    };
    $.ajaxSetup({
      cache: false,
    });
    $.getJSON(api.endpoint)
      .then((response) => {
        console.log(response);
        let recipe = response;
        this.setIndividual(recipe);
        recipe.extendedIngredients.forEach((Ingredient) => {
          console.log(Ingredient.images);
          this.SetIngredients(Ingredient);
        });
        var equipment_array = [];
        var equipment_name_array = [];
        console.log(recipe.analyzedInstructions[0].steps);
        if (recipe.analyzedInstructions[0].steps != null && recipe.analyzedInstructions[0].steps != "") {
          recipe.analyzedInstructions[0].steps.forEach((step) => {
            step.equipment.forEach((equipment) => {
              equipment_array.push(equipment.image);
              equipment_name_array.push(equipment.name);
              console.log(equipment);
            });
          });
          equipment_array = equipment_array.filter(onlyUnique);
          equipment_array.sort();
          equipment_name_array = equipment_name_array.filter(onlyUnique);
          equipment_name_array.sort();
          console.log(equipment_array);
          for (let index = 0; index < equipment_name_array.length; index++) {
            this.$els.indiv_all_equipment.append('<div class="individual"><img src="https://spoonacular.com/cdn/equipment_250x250/' + equipment_array[index] + '" alt="image de ' + equipment_name_array[index] + '"><p class="name">' + equipment_name_array[index] + '</p></div>');

          }
        }
      })
      .catch((e) => {
        console.log(e);
      });
  }
  setIndividual(recipe) {
    console.log(recipe);
    const Title = recipe.title;
    const Image = recipe.image;
    const summary = recipe.summary;
    const Vegetarian = recipe.vegetarian;
    const Vegan = recipe.vegan;
    const Gluten = recipe.glutenFree;
    const Dairy = recipe.dairyFree;
    const Likes = recipe.aggregateLikes;
    const spoonacularScore = recipe.spoonacularScore;
    const healthScore = recipe.healthScore;
    const weightWatcher = recipe.weightWatcherSmartPoints;
    const price = recipe.pricePerServing;
    if (Vegetarian != false) {
      var Vegetarian_true = "<li> Vegetarian friendly </li>";
    }
    if (Vegan != false) {
      var Vegan_true = "<li> Vegan friendly </li>";
    }
    if (Gluten != false) {
      var Gluten_true = "<li> Gluten friendly </li>";
    }
    if (Dairy != false) {
      var Dairy_true = "<li> Dairy friendly </li>";
    }

    const indiv_leftsideTemplate = Indiv_leftsideTemplate({
      Title,
      recipe,
      Image,


    });
    const indiv_rightsideTemplate = Indiv_rightsideTemplate({
      Vegetarian_true,
      Vegan_true,
      Gluten_true,
      Dairy_true,


    });
    const indiv_leftside_secondpartTemplate = Indiv_leftside_secondpartTemplate({
      summary,


    });
    const indiv_rightside_secondpartTemplate = Indiv_rightside_secondpartTemplate({
      Likes,
      spoonacularScore,
      healthScore,
      weightWatcher,
      price,


    });
    this.$els.indiv_leftside.append(indiv_leftsideTemplate);
    this.$els.indiv_rightside.append(indiv_rightsideTemplate);
    this.$els.indiv_leftside_secondpart.append(indiv_leftside_secondpartTemplate);
    this.$els.indiv_rightside_secondpart.append(indiv_rightside_secondpartTemplate);
    this.$els.Container.addClass("is-ready");
  }
  SetIngredients(Ingredient) {
    const Image_ingrediant = Ingredient.image;
    const Title_ingrediant = Ingredient.name;
    const Mesure_ingrediant = Math.round(Ingredient.measures.metric.amount, 2);
    const Unity_ingrediant = Ingredient.measures.metric.unitShort;
    const indiv_IngredientsTemplate = Indiv_IngredientsTemplate({
      Image_ingrediant,
      Title_ingrediant,
      Mesure_ingrediant,
      Unity_ingrediant,

    });
    this.$els.indiv_all_elements.append(indiv_IngredientsTemplate);
  }
  getSimilar() {
    const urlParams = new URLSearchParams(document.location.search);
    const recipeId = urlParams.get("id");
    console.log(recipeId);
    const api = {
      endpoint: "https://api.spoonacular.com/recipes/" +
        recipeId +
        "/similar?apiKey=f0d6a251b326433889bdd28d52da4a72",

    };
    $.ajaxSetup({
      cache: false,
    });
    $.getJSON(api.endpoint)
      .then((response) => {
        console.log(response);
        let similar = response;
        this.setSimilar(similar);
      })
      .catch((e) => {
        console.log(e);
      });
  }




  setSimilar(similar) {
    console.log(similar);
    // const Vegetarian = similar.vegetarian;
    // const Vegan = similar.vegan;
    // const indiv_rightsideTemplate = Indiv_rightsideTemplate({
    //   Vegetarian,
    //   Vegan,


    // });
    // this.$els.indiv_rightside.append(indiv_rightsideTemplate);
    this.$els.Container.addClass("is-ready");
  }



}

function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}