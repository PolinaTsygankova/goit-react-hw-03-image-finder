import PropTypes from 'prop-types';
import { Btn } from './Button.styled';

export function Button({ incrementPageNumber }) {
  return <Btn onClick={incrementPageNumber}>Load more</Btn>;
}

Button.propTypes = {
  incrementPageNumber: PropTypes.func.isRequired,
};
