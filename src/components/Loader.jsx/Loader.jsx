import { ColorRing } from 'react-loader-spinner';
import { Wrapper } from '../ImageGallery/ImageGallery.styled';

export function Loader() {
  return (
    <Wrapper>
      <ColorRing
        visible={true}
        height="100"
        width="100"
        ariaLabel="blocks-loading"
        wrapperStyle={{}}
        wrapperClass="blocks-wrapper"
        colors={['#282ef0', '#77cdff', '#b36af8', '#a8ffc6', '#deebfc']}
        display="flex"
      />
    </Wrapper>
  );
}
