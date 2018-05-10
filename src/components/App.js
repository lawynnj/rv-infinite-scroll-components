import React, { Component } from 'react';
import logo from '../images/logo.svg';
import '../css/App.css';
import { connect } from 'react-redux';
import { loadNextPage } from '../actions'
import InfiniteLoaderTable from './InfiniteLoaderTable';

class App extends Component {
  render() {
    const { list, isNextPageLoading, loadNextPage } = this.props;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <InfiniteLoaderTable  
          hasNextPage={ true }
          isNextPageLoading={ isNextPageLoading }
          list = { list }
          loadNextPage = { loadNextPage }
        />
      </div>
    );
  }
}

const mapStateToProps = ({ data: { list, isNextPageLoading } }) => {
  return {
    /** Are there more items to load? (This information comes from the most recent API request.) */
    hasNextPage: true,
    /** Are we currently loading a page of items? (This may be an in-flight flag in your Redux store for example.) */
    isNextPageLoading,
    /** List of items loaded so far */
    list
  }
}
export default connect(mapStateToProps, { loadNextPage })(App);
