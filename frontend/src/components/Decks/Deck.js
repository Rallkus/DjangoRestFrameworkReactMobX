import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';


@inject('deckStore')
@withRouter
@observer
export default class Deck extends React.Component {
  componentDidMount() {
    const slug = this.props.match.params.slug;
    this.props.deckStore.loadDeck(slug);
    console.log(this.props.deckStore.deck);
  }

  render() {
    const deckDetails = this.props.deckStore.deck;
    const cards = !deckDetails? null : deckDetails.cardsList.map((card, i) => {
      return(
        <p key={i}><b>{card}</b></p>
      )
    });
    console.log(deckDetails);
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