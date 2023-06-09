define([
  'core/js/adapt',
  'core/js/views/menuView',
  "./adapt-walkgrove-fullMenuItemView"
], function(Adapt, MenuView, FullMenuItemView) {

  var FullMenuView = MenuView.extend({

    initialize: function() {
      MenuView.prototype.initialize.apply(this);
      this.setStyles();

      this.listenTo(Adapt, {
        "device:changed": this.onDeviceResize,
        "device:resize": this.onDeviceResize
      });
    },

    onDeviceResize: function() {
      this.setStyles();
      this.setHeroImage();
      const cssVar = 'height: ' + (window.innerHeight - 56) + 'px;'
      this.$('.fullmenu__inner').attr('style', cssVar);
    },

    setStyles: function() {
      const cssVar = 'height: ' + (window.innerHeight - 56) + 'px;'
      this.$('.fullmenu__inner').attr('style', cssVar);
      this.setContentImage();
      this.processHeader();
    },

    setContentImage: function() {
      if (screen.width < '700') {
        this.$('.fullmenu__header').attr('style','background: url(' + this.model.get('_fullMenu')._hero_mobile + ');background-size:cover;background-repeat: no-repeat;background-position: bottom right;');
      } else {
        this.$('.fullmenu__header').attr('style','background: url(' + this.model.get('_fullMenu')._hero + ');background-size:cover;background-repeat: no-repeat;background-position: bottom right;');
      }
     },

    processHeader: function() {
      var config = this.model.get('_fullMenu');
      var header = config && config._menuHeader;

      if (!header) return;

      var $header = this.$('.menu__header');

      this.setHeaderBackgroundImage(header, $header);
      this.setHeaderBackgroundStyles(header, $header);
      this.setHeaderMinimumHeight(header, $header);
    },

    setHeaderBackgroundImage: function(config, $header) {
      var backgroundImages = config._backgroundImage;

      if (!backgroundImages) return;

      var backgroundImage;

      switch (Adapt.device.screenSize) {
        case "large":
          backgroundImage = backgroundImages._large;
          break;
        case "medium":
          backgroundImage = backgroundImages._medium;
          break;
        default:
          backgroundImage = backgroundImages._small;
      }

      if (backgroundImage) {
        $header
          .addClass("has-bg-image")
          .css("background-image", "url(" + backgroundImage + ")");
      } else {
        $header
          .removeClass("has-bg-image")
          .css("background-image", "");
      }
    },

    setHeaderBackgroundStyles: function (config, $header) {
      var styles = config._backgroundStyles;

      if (!styles) return;

      $header.css({
        'background-repeat': styles._backgroundRepeat,
        'background-size': styles._backgroundSize,
        'background-position': styles._backgroundPosition
      });
    },

    setHeaderMinimumHeight: function(config, $header) {
      var minimumHeights = config._minimumHeights;

      if (!minimumHeights) return;

      var minimumHeight;

      switch (Adapt.device.screenSize) {
        case "large":
          minimumHeight = minimumHeights._large;
          break;
        case "medium":
          minimumHeight = minimumHeights._medium;
          break;
        default:
          minimumHeight = minimumHeights._small;
      }

      if (minimumHeight) {
        $header
          .addClass("has-min-height")
          .css("min-height", minimumHeight + "px");
      } else {
        $header
          .removeClass("has-min-height")
          .css("min-height", "");
      }
    },

  }, {
    childView: FullMenuItemView,
    className: 'fullmenu',
    template: 'fullMenu'
  });

  Adapt.on('router:menu', function(model) {
    $('#wrapper').append(new FullMenuView({model: model}).$el);
  });

});
