import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;
class DeckStore {
  @observable isLoading = false;
  @observable decksRegistry = observable.map();
  @computed get decks() {
    return this.decksRegistry.values();
  };
  $req() {
      return agent.Decks.all(this.page, LIMIT);
    }
  @action loadDecks() {
      this.isLoading = true;
      return this.$req()
      .then(action(({ deck, deckCount }) => {
      console.log(deck);
      this.decksRegistry.clear();
      deck.forEach(deck => this.decksRegistry.set(deck.slug, deck));
      this.totalPagesCount = Math.ceil(deckCount / LIMIT);
      }))
    .finally(action(() => { this.isLoading=false }));
  }

}

export default new DeckStore();