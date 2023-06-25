import React from 'react';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
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
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </AppStyled>
    );
  }
}
