import { Client, ClientOptions, Collection } from 'discord.js';

class NotAClient extends Client {

	private _queue: Map<string,any>;
	private _commands: Collection<string,Function>;

	constructor(config: ClientOptions) {
		super(config);

		this._commands = new Collection();
		this._queue = new Map();
	}

	get commands() { return this._commands; }
	get queue() { return this._queue; }
};

export default NotAClient;