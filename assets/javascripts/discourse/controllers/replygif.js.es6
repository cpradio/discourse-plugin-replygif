import ModalFunctionality from 'discourse/mixins/modal-functionality';
import AjaxLib from 'discourse/lib/ajax';

export default Ember.Controller.extend(ModalFunctionality, {
  loading: true,
  categories: [],
  selectedTags: [],
  currentGifs: [],
  tags: [],
  selectedGifs: [],

  loadingTags: function(){
    return this.get("categories").length === 0;
  }.property("categories"),

  popularCategories: function(){
    return this.get("categories").sortBy("count");
  }.property("categories"),

  filterCategories: function() {
    return this.get("categories").filter(function(item) { return item.title.length > 0; }).uniq();
  }.property("categories"),

  actions: {
    pickItem: function(file) {
      var currentSelectedItems = this.get("selectedGifs");
      var itemLocation = currentSelectedItems.indexOf(file);
      if (itemLocation > -1) {
        currentSelectedItems.splice(itemLocation, 1);
      } else {
        currentSelectedItems.push(file);
      }
      this.set("selectedGifs", currentSelectedItems);
    },
    apply: function() {
      var selectedItems = this.get("selectedGifs"), self = this, output = "";
      selectedItems.forEach(function(item) {
        output += "![](" + item + ") ";
      });

      if (self.composerViewOld)
        self.composerViewOld.addMarkdown(output);
      else if (self.composerView)
        self.composerView._addText(self.composerView._getSelected(), output);

      this.set("selectedGifs", []);
      this.send('closeModal');
    }
  },

  refresh: function() {
    this.set("loading", true);
    this.set("selectedGifs", []);

    var url = this.getUrl("gifs");

    if (this.get("selectedCategory") && this.get("selectedCategory").length > 0) {
      url += "&reply=" + this.get("selectedCategory");
    }

    if (this.get("selectedTags") && this.get("selectedTags").length > 0) {
      url += "&tag-operator=and&tag=" + this.get("selectedTags").join(",");
    }

    AjaxLib.ajax(url).then(function(resp) {
      this.get("currentGifs").setObjects(resp);
      this.set("loading", false);
    }.bind(this));
  },

  onShow: function() {
    this.setProperties({"loading": true, "categories": [], "selectedCategory": "", "selectedTags": [], tags: [], selectedGifs: [] });

    AjaxLib.ajax(this.getUrl("replies")).then(
        function(resp) {
          this.set("categories", resp);
          this.set("selectedCategory", this.get("filterCategories")[0].title);
          this.refresh();
        }.bind(this)
    );

    AjaxLib.ajax(this.getUrl("tags")).then(
        function(resp) {
          this.set("tags", resp);
        }.bind(this)
    );
  },

  init: function () {
    this._super();

    this.addObserver("selectedCategory", function() {
      this.refresh();
    }.bind(this));

    this.addObserver("selectedTags", function() {
      this.refresh();
    }.bind(this));
  },

  getUrl: function(path) {
    return this.siteSettings.replygif_api_url + path + "?api-key=" + this.siteSettings.replygif_api_key;
  }
});