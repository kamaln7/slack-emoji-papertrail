1. [Create a Slack app](https://api.slack.com/apps)
1. Enable the Bot user and generate an OAuth token for it
1. [![Deploy to DO](https://mp-assets1.sfo2.digitaloceanspaces.com/deploy-to-do/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/kamaln7/slack-emoji-papertrail/tree/main)
1. Go back to the Slack App config and click on Event Subscriptions
1. Enable and paste your app's URL in the Request URL field like so: `https://yourapp.ondigitalocean.app/slack/events`
1. Subscribe to the bot event `emoji_changed`
