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

                this.$email = this.$el.find('#email-addr');
                this.$twitter = this.$el.find('#twitter-handle');

                this.$successModal = this.$el.find('#success-modal');
                this.$successTitle = this.$el.find('#success-title');
                this.$successMessage = this.$el.find('#success-message');

                this.$successModal.modal({show: false});

                // Maintains chainability
                return this;

            },

            startJourney: function () {
                if ( this.$email.val() && this.$twitter.val() ){

                    var self = this;
                    data = {};
                    data.primaryEmailAddress = this.$email.val().replace(/\<|\>/gi, '');
                    data.twitterHandle = this.$twitter.val().replace(/@|\<|\>/gi, '')
                    data.twitterFollowers = '200';
                    url = "https://jwarvel-jbdbc-hw.herokuapp.com/fireEvent/helloWorld";
                    url = "http://softlife.herokuapp.com/fireEvent/helloWorld";

                    // post to trigger app
                    $.ajax({
                        type: "POST",
                        url: url,
                        data: data,
                        headers: {
                            "Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"
                        },
                        success: function (response, status) {
                            self.$successTitle.html("You're in!  Good luck!")
                            self.$successMessage.html( "You've been entered into the contest.  Check your email and Twitter mentions shortly to see if you've won!" );
                            self.complete();
                        },
                        error: function (error, response) {
                            self.$successTitle.html("No jetpack for you!");
                            self.$successMessage.html( "Sorry, we are unable to enter you in the contest at this time." );
                            self.complete();
                        }
                    });

                }

            },
            complete: function () {
                this.$email.val('');
                this.$twitter.val('');
                this.$successModal.modal('show');
            }

        });

// Returns the View class
        return journeyView;

    });
