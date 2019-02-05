import React from 'react';
import { Link } from 'react-router-dom';

export default function Decks(props) {
 
      const decks = props.decks.map(deck => {
        return (
          <Link to={`/decks/${deck.slug}`} key={deck.slug} className="preview-link">
            <img src={deck.image} alt="deck"/>
            <p><b>Deck name: {deck.name}</b></p>
            <p><b>Owner: {deck.player.slug}</b></p>
          </Link>
        );
      });
    return (
        <div>
            {decks}
        </div>);
  }