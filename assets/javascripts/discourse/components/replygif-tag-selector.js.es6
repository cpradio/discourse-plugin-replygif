import TextField from 'discourse/components/text-field';
import { findRawTemplate } from "discourse/lib/raw-templates";

export default TextField.extend({
  datasource: undefined,
  search: "",

  _initializeAutocomplete: function() {
    var self = this,
        selected = [];

    this.$().val(this.get('tags')).autocomplete({
      template: findRawTemplate('replygif-tag-selector-autocomplete'),
      disabled: this.get('disabled'),

      dataSource: function(term) {
        self.set("search", term.toLowerCase());
        var searchTerm = self.get("search");
        return self.get("datasource.tags").filter(function(item) {
          return item.title.match(new RegExp("^" + searchTerm + ".*", "i"));
        }).uniq().slice(0, 10);
      },

      transformComplete: function(item) {
        return item.title;
      },

      onChangeItems: function(items){
        self.get("datasource.selectedTags").setObjects(items);
        self.sendAction("refresh");
        self.$().autocomplete({ cancel: true })
      }
    });
  }.on('didInsertElement'),

  _removeAutocomplete: function() {
    this.$().autocomplete('destroy');
  }.on('willDestroyElement')

});
