import { observable, action, computed } from 'mobx';
import agent from '../agent';

const LIMIT = 10;
class DeckStore {
  @observable isLoading = false;
  @observable decksRegistry = observable.map();
  @observable deck = null;
  @observable deckSlug = undefined;

  @observable page = 0;
  @observable totalPagesCount = 0;
  @computed get decks() {
    return this.decksRegistry.values();
  };
  getDeck(slug) {
    return this.decksRegistry.get(slug);
  }
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
      this.decksRegistry.clear();
      deck.forEach(deck => this.decksRegistry.set(deck.slug, deck));
      this.totalPagesCount = Math.ceil(deckCount / LIMIT);
      }))
    .finally(action(() => { this.isLoading=false }));
  }
  @action loadDeck(slug, { acceptCached = false } = {}) {
    if (acceptCached) {
      const deck = this.getDeck(slug);
      if (deck) return Promise.resolve(deck);
    }
    this.isLoading = true;
    return agent.Decks.get(slug)
      .then(action(({ deck }) => {
        console.log(deck);
        this.deck=deck;
        return deck;
      }))
      .finally(action(() => { this.isLoading = false; }));
  }

}

export default new DeckStore();