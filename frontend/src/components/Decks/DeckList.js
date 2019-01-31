import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Decks from "./Decks";


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
        {<Decks
        decks={this.props.deckStore.decks} />}
      </div>
      
    )
    
  }
}