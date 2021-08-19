import { Client, ClientOptions, Collection } from 'discord.js';

class NotAClient extends Client {

	private _queue: Map<any,any>;
	private _cooldowns: Collection<any,any>;
	private _commands: Collection<any,any>;
	private _prefix: string = '!';

	constructor(config: ClientOptions) {
		super(config);

		this._commands = new Collection();
		this._cooldowns = new Collection();
		this._queue = new Map();
	}

	get prefix() { return this._prefix; }
	set prefix(prefix: string){ this.prefix = prefix; }

	get commands() { return this._commands; }

	get cooldowns() { return this._cooldowns; }

	get queue() { return this._queue; }
};

export default NotAClient;