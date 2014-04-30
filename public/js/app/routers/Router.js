// Router.js

define(["jquery", "backbone", "models/IndexModel", "views/IndexView", "views/currWxView", "views/journeyView", "collections/IndexCollection"],

    function($, Backbone, Model, View, CurrWxView, JourneyView, Collection) {

        var Router = Backbone.Router.extend({

            initialize: function() {

                // Tells Backbone to start watching for hashchange events
                Backbone.history.start();

            },

            // All of your Backbone Routes (add more)
            routes: {

                // When there is no hash on the url, the home method is called
                "": "journey",
                "test":"test",
                "currwx":"currwx",
                "journey":"journey"

            },

            index: function() {

                // Instantiates a new view which will render the header text to the page
                new View();

            },

            currwx: function() {
                new CurrWxView();
            },

            journey: function() {
                new JourneyView();
            },

            test: function(){
                alert('test!');
            }

        });

        // Returns the DesktopRouter class
        return Router;

    }

);