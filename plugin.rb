# name: discourse-plugin-replygif
# about: Add ReplyGIF support
# version: 1.1.5
# authors: Matthew Wilkin
# url: https://github.com/cpradio/discourse-plugin-replygif

enabled_site_setting :replygif_enabled

register_asset 'stylesheets/replygif.scss'

register_svg_icon 'far-play-circle' if respond_to?(:register_svg_icon)
