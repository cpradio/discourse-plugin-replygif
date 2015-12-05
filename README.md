# ReplyGif Plugin
This plugin adds support for ReplyGif to quickly embed animated gifs into a topic.

Composer Window Button
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-replygif/master/screenshot-composer.png)

Admin Settings
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-replygif/master/screenshot-admin-settings.png)

In Action
![](https://raw.githubusercontent.com/cpradio/discourse-plugin-replygif/master/screenshot-action.gif)

## How to Help

- Create a PR with a new translation!
- Log Issues
- Submit PRs to help resolve issues

## Installation

Follow the directions at [Install a Plugin](https://meta.discourse.org/t/install-a-plugin/19157) using https://github.com/cpradio/discourse-plugin-replygif.git as the repository URL.

## HTTPS Additional Setup

If your instance utilizes HTTPS, you will need to setup a reverse proxy to handle API requests for ReplyGif as the service itself does not support HTTPS at this moment (2015-12).

Using a docker install, take the web.replygif.template.yml file and copy it into your /var/discourse/templates folder. 

```
wget https://raw.githubusercontent.com/cpradio/discourse-plugin-replygif/master/web.replygif.template.yml -O /var/discourse/templates/web.replygif.template.yml
```

Next update your containers/app.yml to include the template 

```
  - "templates/web.replygif.template.yml"
```

Once that is done, you will need to rebuild the app and then go into the Admin > Settings area and search for `replygif api url`, change the URL to `https://your_domainname/replygif/` and you are all done!

## Authors

Matthew Wilkin

## License

GNU GPL v2
