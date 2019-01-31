import React from 'react';

export default function Decks(props) {
 
      const decks = props.decks.map(deck => {
        return (
          
          <div key={deck.slug}>
            <img src={deck.image} alt="deck"/>
            <p><b>Deck name: {deck.name}</b></p>
            <p><b>Owner: {deck.player.slug}</b></p>
          </div>
        );
      });
    return (
        <div>
            {decks}
        </div>);
  }