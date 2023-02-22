import ConvenientEffectsApp from './app/convenient-effects-app.js';
import Settings from './settings.js';

/**
 * Simple helpers for querying aspects of foundry
 */
export default class FoundryHelpers {
  constructor() {
    this._settings = new Settings();
  }

  /**
   * Gets all UUIDs for selected or targeted tokens, depending on if priortize
   * targets is enabled
   *
   * @returns {string[]} actor uuids for selected or targeted tokens
   */
  getActorUuids() {
    if (
      canvas.tokens.controlled.length == 0 &&
      game.user.targets.size == 0 &&
      game.user.character == undefined
    ) {
      return [];
    }

    if (this._settings.prioritizeTargets && game.user.targets.size !== 0) {
      return Array.from(game.user.targets).map((token) => token.actor.uuid);
    } else if (canvas.tokens.controlled.length !== 0) {
      return canvas.tokens.controlled.map((token) => token.actor.uuid);
    } else {
      return [game.user.character.uuid];
    }
  }

  /**
   * Gets the actor object by the actor UUID
   *
   * @param {string} uuid - the actor UUID
   * @returns {Actor5e} the actor that was found via the UUID
   */
  getActorByUuid(uuid) {
    const actorToken = fromUuidSync(uuid);
    const actor = actorToken?.actor ? actorToken?.actor : actorToken;
    return actor;
  }

  /**
   * Re-renders the Convenient Effects application if open
   */
  renderConvenientEffectsAppIfOpen() {
    const openApps = Object.values(ui.windows);
    const convenientEffectsApp = openApps.find(
      (app) => app instanceof ConvenientEffectsApp
    );

    if (convenientEffectsApp) {
      convenientEffectsApp.render();
    }
  }
}
