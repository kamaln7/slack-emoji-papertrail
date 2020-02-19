const channel = process.env.SLACK_CHANNEL;
const token = process.env.SLACK_TOKEN;
const signingSecret = process.env.SLACK_SIGNING_SECRET;

if (!channel) {
	console.error('Set the channel using the SLACK_CHANNEL env var');
	process.exit(1);
}

if (!token) {
	console.error('Set the token using the SLACK_TOKEN env var');
	process.exit(1);
}

if (!signingSecret) {
	console.error('Set the signing secret using the SLACK_SIGNING_SECRET env var');
	process.exit(1);
}

const { App } = require('@slack/bolt');
const app = new App({
	token,
	signingSecret,
});

(async () => {
	await app.start(process.env.PORT || 3000);
	console.log(`connected, listening on port ${process.env.PORT || 3000}`);

	app.event('emoji_changed', async ({ event, context}) => {
		try {
			const action = event.subtype == 'add' ? 'New' : 'Deleted';

			let emojis = [];
			event.name && emojis.push(event.name);
			event.names && emojis.push(...event.names);

			emojis = emojis.map(e => `:${e}:`).join(' ')

			const text = `${action} emojis: ${emojis}`
			const result = await app.client.chat.postMessage({
				token,
				channel,
				text,
			})
			console.log(text)
		} catch (error) {
			console.error(error)
		}
	});
})();
