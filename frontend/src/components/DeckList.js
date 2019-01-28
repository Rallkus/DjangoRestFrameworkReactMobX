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
    console.log(this.props.deckStore.decksRegistry);
    return(
      <h1>Hola</h1>
    )
    
  }
}