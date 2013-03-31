pb.views.Welcome = Backbone.View.extend({

    initialize: function () {
        this.template = fb.templateLoader.get('welcome');
        this.render();
    },

    render: function () {
        this.$el.html(this.template());
        return this;
    },

    events: {
        'click [data-action=facebook-login]': 'facebook',
        'click [data-action=login]': 'login',
        'click [data-action=twitter-login]': 'twitter'
    },

    facebook: function () {
        $(document).trigger('login');
        return false;
    },
    twitter: function(){
        
    },
    login: function(){
        
    }
});
pb.views.Menu = Backbone.View.extend({
    initialize: function () {
        this.template = fb.templateLoader.get('welcome');
        this.render();
    },
    render: function () {
        this.$el.html(this.template());
        return this;
    }
});