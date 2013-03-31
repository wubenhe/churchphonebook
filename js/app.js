window.addEventListener('load', function () {
    new FastClick(document.body);
}, false);

var pb = new MobileApp();

pb.spinner = $("#spinner");
pb.spinner.hide();

pb.slider = new PageSlider($('#container'));

pb.MobileRouter = Backbone.Router.extend({

    routes: {
        "":"welcome",
        "menu":"menu"
    },

    welcome: function () {
        // Reset cached views
        pb.myView = null;
        pb.myFriendsView = null;
        var view = new pb.views.Welcome();
        pb.slider.slidePageFrom(view.$el, "left");
    },
    menu: function() {
        pb.slider.slidePageFrom(new pb.views.Menu().$el, "left");
        pb.slider.resetHistory();
    }
});

$(document).on('ready', function () {

    pb.templateLoader.load(['welcome'], function () {
        pb.router = new pb.MobileRouter();
        Backbone.history.start();
        FB.init({ appId: "161544114004629", nativeInterface: CDV.FB, useCachedDialogs: false, status: true });
    });

    FB.Event.subscribe('auth.statusChange', function(event) {
        if (event.status === 'connected') {
            FB.api('/me', function (response) {
                pb.user = response; // Store the newly authenticated FB user
            });
            pb.slider.removeCurrentPage();
            pb.router.navigate("menu", {trigger: true});
        } else {
            pb.user = null; // Reset current FB user
            pb.router.navigate("", {trigger: true});
        }
    });

});

$(document).on('click', '.button.back', function() {
    window.history.back();
    return false;
});

$(document).on('click', '.logout', function () {
    FB.logout();
    return false;
});

$(document).on('login', function () {
    FB.login(function(response) {
        console.log("Logged In");
    }, {scope: 'publish_actions,user_status,friends_status,read_stream'});
    return false;
});

$(document).on('permissions_revoked', function () {
    // Reset cached views
    pb.myView = null;
    pb.myFriendsView = null;
    return false;
});