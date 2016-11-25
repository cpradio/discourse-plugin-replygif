export default Ember.Component.extend({
  result: Em.computed.alias("content"),
  tagName: "div",
  selected: false,
  classNames: ["replygif-imgwrap"],

  selectedClass: function() {
    return this.get("selected") ? "selected" : "";
  }.property("selected"),

  selectedChanged: function() {
    this.rerender();
  }.observes('selected'),

  click: function() {
    this.set("selected", !this.get("selected"));
    this.sendAction("pickItem", this.get("result.file"));
  },

  alternateText: function() {
    return I18n.t("replygif.alternate_text", {tags: this.get("result.tags").join(", "), caption: this.get("result.caption")})
  }.property("result"),

  imagePath: function() {
    if (this.get("selected")) {
      return this.get("result.file");
    } else {
      return this.get("result.file").replace("/i/", "/thumbnail/");
    }
  }.property("result.file", "selected")
});
