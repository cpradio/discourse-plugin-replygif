import { bufferedRender } from 'discourse-common/lib/buffered-render';

export default Ember.View.extend(bufferedRender({
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
    this.get("controller").send("pickItem", this.get("result.file"));
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
  }.property("result.file", "selected"),

  buildBuffer(buffer) {
    let selectedClass = this.get('selectedClass');
    let imagePath = this.get('imagePath');
    let alternateText = this.get('alternateText');

    buffer.push(`<img class="replygif-img ${selectedClass}" src="${imagePath}" alt="${alternateText}" title="${alternateText}">`);
  }
}));
