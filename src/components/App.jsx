import React from 'react';
import { Searchbar } from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';

import { AppStyled } from './App.styled';

export class App extends React.Component {
  state = {
    value: '',
  };

  getValueFromInput = value => {
    this.setState({ value });
  };

  render() {
    return (
      <AppStyled>
        <Searchbar onSubmit={this.getValueFromInput} />
        <ImageGallery textQuery={this.state.value} />
      </AppStyled>
    );
  }
}
