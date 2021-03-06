import React from 'react';
import { inject, observer } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import Decks from "./Decks";
import ListPagination from '../ListPagination';
import PropTypes from 'prop-types';


@inject('deckStore')
@withRouter
@observer
export default class DeckList extends React.Component {
  handleSetPage = page => {
    this.props.deckStore.setPage(page);
    this.props.deckStore.loadDecks();
  };
  componentDidMount() {
    this.props.deckStore.loadDecks();
  }

  render() {
    return this.props.deckStore.isLoading? (
      <h1>...LOADING</h1>
    ) :
    (
      <div>
        <Decks
        decks={this.props.deckStore.decks} />
        <ListPagination
        onSetPage={this.handleSetPage}
        totalPagesCount={this.props.deckStore.totalPagesCount}
        currentPage={this.props.deckStore.page}
      />
      </div>
      
    )
    
  }
}
DeckList.propTypes = {
  page: PropTypes.number,
  decks: PropTypes.array,
  onSetPage:PropTypes.func,
  totalPagesCount:PropTypes.number,
  currentPage:PropTypes.number
}