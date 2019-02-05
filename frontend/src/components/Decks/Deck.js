import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';


@inject('deckStore')
@withRouter
@observer
export default class Deck extends React.Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.deckStore.loadDeck(slug);
  }

  render() {
    const deckDetails = this.props.deckStore.deck;
    const cards = !deckDetails? null : deckDetails.cardsList.map((card, i) => {
      return(
        <p key={i}><b>{card}</b></p>
      )
    });
    return !deckDetails? (
      <h1>...LOADING</h1>
    ) :
    (
      <div>
        <img src={deckDetails.image} alt="deck"/>
        <p><b>Deck name: {deckDetails.name}</b></p>
        <p><b>Owner: {deckDetails.player.slug}</b></p>
        <h1>List of cards</h1>
        {cards}
      </div>
      
    )
    
  }
}
Deck.propTypes = {
  slug: PropTypes.string,
  cards: PropTypes.oneOfType([null, Array]),
  deckDetails:PropTypes.object
}