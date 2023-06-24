import { Btn } from './Button.styled';

export function Button({ incrementPageNumber }) {
  return <Btn onClick={incrementPageNumber}>Load more</Btn>;
}
