define([
  'core/js/adapt',
  'core/js/views/componentView',
  'core/js/models/componentModel'
], function(Adapt, ComponentView, ComponentModel) {

  var PageFooterView = ComponentView.extend({

    preRender: function() {
      this.checkIfResetOnRevisit();
      this.setCompletionStatus();
    },

    postRender: function() {
      this.setReadyStatus();
      
    },

    

    checkIfResetOnRevisit: function() {
      var isResetOnRevisit = this.model.get('_isResetOnRevisit');

      // If reset is enabled set defaults
      if (isResetOnRevisit) {
        this.model.reset(isResetOnRevisit);
      }
    }
  },
  {
    template: 'pageFooter'
  });

  return Adapt.register('pageFooter', {
    model: ComponentModel.extend({}),// create a new class in the inheritance chain so it can be extended per component type if necessary later
    view: PageFooterView
  });
});
