import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject('deckStore')
@withRouter
@observer
export default class DeckList extends React.Component {
  componentDidMount() {
    this.props.deckStore.loadDecks();
  }

  render() {
    return this.props.isLoading? (
      <h1>...LOADING</h1>
    ) :
    (
      <div>
        {this.props.deckStore.decks.map(deck => {
        return (
          
          <div key={deck.slug}>
            <img src={deck.image} alt="deck"/>
            <p><b>Deck name: {deck.name}</b></p>
            <p><b>Owner: {deck.player.slug}</b></p>
          </div>
        );
      })}
      </div>
      
    )
    
  }
}