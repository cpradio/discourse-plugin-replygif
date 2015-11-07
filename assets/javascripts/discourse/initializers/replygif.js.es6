import showModal from 'discourse/lib/show-modal';
import ApplicationRoute from 'discourse/routes/application';
import ComposerView from 'discourse/views/composer';
import { onToolbarCreate } from 'discourse/components/d-editor';

export default
{
  name: 'replygif',
  initialize(container)
  {
    const siteSettings = container.lookup('site-settings:main');

    if (siteSettings.replygif_enabled) {
      if (typeof Discourse.ComposerEditorComponent === "undefined") {
        ApplicationRoute.reopen({
          actions: {
            showReplyGif: function (composerView) {
              showModal('replygif');
              this.controllerFor('replygif').setProperties({composerViewOld: composerView});
            }
          }
        });

        ComposerView.reopen({
          initEditor: function () {
            // overwrite and wrap.
            this._super();
            if (Discourse.SiteSettings.replygif_enabled
                && Discourse.SiteSettings.replygif_api_url
                && Discourse.SiteSettings.replygif_api_key) {
              var view = this;
              var button_text = I18n.t("replygif.composer_button_text");
              var btn = $('<button class="wmd-button wmd-replygif-button" title="' + button_text + '" aria-label="' + button_text + '"></button>');
              btn.click(function () {
                view.get("controller").send("showReplyGif", view);
              });
              $("#wmd-button-row,.wmd-button-row").append(btn);
            }
          }
        });
      } else {
        Discourse.DEditorComponent.reopen({
          actions: {
            showReplyGif: function() {
              showModal('replygif').setProperties({composerView: this});
            }
          }
        });

        onToolbarCreate(toolbar => {
          toolbar.addButton({
            id: "replygif_button",
            group: "extras",
            icon: "play-circle-o",
            action: 'showReplyGif'
          });
        });
      }
    }
  }
};