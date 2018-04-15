/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
// import { get as _get } from 'lodash';
import stdout from '../../../stdout';
// import './style.scss';

const debug = stdout('container/Home/Gallery');

export class Gallery extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    images: [],
  }

  render() {
    const { images } = this.props;
    debug(images);

    return (
      <div>
        {images.map(i => (<img
          src={`${i.prepend}${i.filename}`}
          key={i.id}
          alt={i.filename}
        />))}
      </div>
    );
  }
}

export default connect(null, null)(Gallery);
