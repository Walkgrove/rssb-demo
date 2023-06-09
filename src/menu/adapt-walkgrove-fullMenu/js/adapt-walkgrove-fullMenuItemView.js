define([
  'core/js/adapt',
  "core/js/views/menuItemView"
], function(Adapt, MenuItemView) {

  var FullMenuItemView = MenuItemView.extend({

    events: {
      'click .js-btn-click' : 'onClickMenuItemButton',
      'mouseenter .js-btn-click' : 'onShowHover',
      'mouseleave .js-btn-click' : 'onHideHover'
    },

    onClickMenuItemButton: function(event) {
      if (event && event.preventDefault) event.preventDefault();
      if (this.model.get('_isLocked')) return;
      if (Adapt.config.get('_sound')._isActive === true) {
        Adapt.trigger('audio:setup', {src: 'course/en/audio/blank.mp3'});
        Adapt.trigger('audio:pause');
      }
      Backbone.history.navigate('#/id/' + this.model.get('_id'), {trigger: true});
    },

    onShowHover: function() {
      this.$('.fullmenu-item__hover').addClass('hovering');
    },

    onHideHover: function() {
      this.$('.fullmenu-item__hover').removeClass('hovering');
    }


  }, {
    className: 'fullmenu-item',
    template: 'fullMenuItem'
  });

  return FullMenuItemView;

});
