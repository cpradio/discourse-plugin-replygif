import { withPluginApi } from 'discourse/lib/plugin-api';
import Composer from 'discourse/components/d-editor';
import showModal from 'discourse/lib/show-modal';

function initializePlugin(api)
{
  const siteSettings = api.container.lookup('site-settings:main');

  if (siteSettings.replygif_enabled
      && siteSettings.replygif_api_url
      && siteSettings.replygif_api_key) {
    Composer.reopen({
      actions: {
        showReplyGif: function () {
          showModal('replygif', { title: 'replygif.modal_title' }).setProperties({composerView: this});
        }
      }
    });

    api.onToolbarCreate(toolbar => {
      toolbar.addButton({
        id: "replygif_button",
        group: "extras",
        icon: "far-play-circle",
        action: 'showReplyGif'
      });
    });
  }
}

export default
{
  name: 'replygif',
  initialize(container)
  {
    withPluginApi('0.1', api => initializePlugin(api));
  }
};
