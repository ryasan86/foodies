import { useEffect } from 'react';
import PropTypes from 'prop-types';

import Masonry from './Masonry';
import Tile from '../Tile/Tile';

const MasonryHOC = ({ pins, onLoadMore }) => {
  const getDocumentHeight = () => {
    const body = document.body;
    const html = document.documentElement;

    return Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight,
    );
  };

  const getScrollTop = () => {
    return window.pageYOffset !== undefined
      ? window.pageYOffset
      : (document.documentElement || document.body.parentNode || document.body)
          .scrollTop;
  };

  const handleScroll = () => {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) return;
    onLoadMore();
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  return (
    <Masonry>
      {pins.map(pin => (
        <Tile key={pin._id} pin={pin} />
      ))}
    </Masonry>
  );
};

MasonryHOC.propTypes = {
  pins: PropTypes.array.isRequired,
  onLoadMore: PropTypes.func.isRequired,
};

export default MasonryHOC;
