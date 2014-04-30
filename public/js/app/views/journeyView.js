// currWxView.js

define(["jquery", "backbone", "text!templates/journey.html", "models/currWxModel"],

    function ($, Backbone, template, CurrWxModel) {

        var journeyView = Backbone.View.extend({

            // The DOM Element associated with this view
            el: ".magic",

            // View constructor
            initialize: function () {

                _.bindAll(this, 'startJourney');
                // Calls the view's render method
                this.render();
                this.model = new CurrWxModel();

            },

            // View Event Handlers
            events: {
                'click #startJourney': 'startJourney'
            },

            // Renders the view's template to the UI
            render: function () {

                // Setting the view's template property using the Underscore template method
                this.template = _.template(template, {});

                // Dynamically updates the UI with the view's template
                this.$el.html(this.template);

                this.$email = this.$el.find('#emailAddr');
                this.$twitter = this.$el.find('#twitterHandle');


                // Maintains chainability
                return this;

            },

            startJourney: function () {
                var self = this;
                data = {};
                data.primaryEmailAddress = this.$email.val();
                data.twitterHandle = this.$twitter.val();
                data.twitterFollowers = '200';
                url = "https://jwarvel-jbdbc-hw.herokuapp.com/fireEvent/helloWorld";
                url = "http://softlife.herokuapp.com/fireEvent/helloWorld";

                // post to trigger app
                $.ajax({
                    type: "POST",
                    url: url,
                    data: data,
                    headers: {
                        "Content-Type":"application/x-www-form-urlencoded; charset=UTF-8"
                    },
                    success: function (response, status) {
                        console.log(response);
                        //self.$el.find('#journeyInfo').html( response );
                    },
                    error: function (error, response) {
                        console.log('error starting')
                    }
                });


            }

        });

// Returns the View class
        return journeyView;

    });
