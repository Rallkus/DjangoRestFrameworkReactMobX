import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;
class DeckStore {
  @observable isLoading = false;
  @observable decksRegistry = observable.map();

  @observable page = 0;
  @observable totalPagesCount = 0;
  @computed get decks() {
    return this.decksRegistry.values();
  };
  $req() {
      return agent.Decks.all(this.page, LIMIT);
    }

  @action setPage(page) {
    this.page = page;
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