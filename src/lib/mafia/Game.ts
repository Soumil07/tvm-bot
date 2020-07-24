import { TextChannel } from '@klasa/core';
import { KlasaUser } from 'klasa';

import Phase from '@mafia/Phase';
import PlayerManager from '@mafia/managers/PlayerManager';
import Godfather from '@lib/Godfather';
import Player from '@mafia/Player';

export default class Game {

	public client: Godfather;
	public phase: Phase;
	public players: PlayerManager;
	public constructor(public host: KlasaUser, public channel: TextChannel) {
		this.client = channel.client as Godfather;
		this.phase = Phase.STANDBY;
		this.players = new PlayerManager(this);
		this.players.push(new Player(host));
	}

	public get hasStarted(): boolean {
		return this.phase === Phase.PREGAME;
	}

	public get majorityVotes(): number {
		const alivePlayers = this.players.filter(player => player.isAlive);
		return Math.floor(alivePlayers.length / 2) + 1;
	}

	public delete(): void {
		this.client.games.delete(this.channel.id);
	}

}
