pb.views.Welcome = Backbone.View.extend({

    initialize: function () {
        this.template = pb.templateLoader.get('welcome');
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
        this.template = pb.templateLoader.get('menu');
        this.render();
    },
    render: function () {
        this.$el.html(this.template());
        this.resultpanel = this.find('[data-panel=searchresult]');
        return this;
    },
    events:{
        'keyup [data-action=search]': 'autocomplete'
    },
    autocomplete:function(){
        var self = this;
        if(this.keyuptimer){
            clearTimeout(this.keyuptimer); 
            this.keyuptimer = null;
        }
        this.keyuptimer = setTimeout(function(){
            if(self.keyupXhr){
                self.keyupXhr.abort();
            }
            return self.keyupXhr = $.ajax({
                method:'post', 
                complete:this.createResult, 
                context:this, 
                url:'http://ccmu-ccon159.dotcloud.com/r/scbc/', 
                dataType:'json'
            });
        }, 500)
    }, 
    createResult:function(data){
        var template = pb.templateLoader.get('searchresult');
        var html = template(data);
        this.resultpanel.html(html);
    }
});