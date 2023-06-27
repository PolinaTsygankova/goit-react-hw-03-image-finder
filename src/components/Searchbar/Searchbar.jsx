import React from 'react';
import PropTypes from 'prop-types';
import { SearchBar, Form, Btn, Label, Input } from './Searchbar.styled';

export class Searchbar extends React.Component {
  state = {
    value: '',
  };

  handleInputChange = ({ target }) => {
    const value = target.value;
    this.setState({ value });
  };

  handleFormSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.value);
    this.setState({ value: '' });
  };

  render() {
    return (
      <SearchBar className="searchbar">
        <Form className="form" onSubmit={this.handleFormSubmit}>
          <Btn type="submit" className="button">
            <Label className="button-label">Search</Label>
          </Btn>

          <Input
            className="input"
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            onChange={this.handleInputChange}
            value={this.state.value}
          />
        </Form>
      </SearchBar>
    );
  }
}

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};