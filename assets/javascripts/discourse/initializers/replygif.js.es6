import showModal from 'discourse/lib/show-modal';
import ApplicationRoute from 'discourse/routes/application';
import ComposerView from 'discourse/views/composer';
import { onToolbarCreate } from 'discourse/components/d-editor';
import NewComposer from 'discourse/components/d-editor';

export default
{
  name: 'replygif',
  initialize(container)
  {
    const siteSettings = container.lookup('site-settings:main');

    if (siteSettings.replygif_enabled
      && siteSettings.replygif_api_url
      && siteSettings.replygif_api_key) {
      if (NewComposer !== "undefined") {
        NewComposer.reopen({
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
      } else {
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
            var view = this;
            var button_text = I18n.t("replygif.composer_button_text");
            var btn = $('<button class="wmd-button wmd-replygif-button" title="' + button_text + '" aria-label="' + button_text + '"></button>');
            btn.click(function () {
              view.get("controller").send("showReplyGif", view);
            });
            $("#wmd-button-row,.wmd-button-row").append(btn);
          }
        });
      }
    }
  }
};