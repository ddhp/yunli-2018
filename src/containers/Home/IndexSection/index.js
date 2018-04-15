/* eslint react/prefer-stateless-function: 0 */
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { get as _get } from 'lodash';
// import { get as _get } from 'lodash';
import stdout from '../../../stdout';
import './style.scss';

const debug = stdout('container/Home/IndexSection');

export class IndexSection extends React.Component {
  static propTypes = {
    images: PropTypes.arrayOf(PropTypes.object),
  }

  static defaultProps = {
    images: [],
  }

  render() {
    const { images } = this.props;
    debug(images);

    images.unshift({
      id: 'dummy1',
    });

    images.unshift({
      id: 'dummy2',
    });

    return (
      <section className="section--index" id="index">
        {images.map(i => (
          <div className="index-img">
            {i.filename &&
              <img
                src={`${i.prepend}${i.filename}`}
                key={i.id}
                alt={i.filename}
              />
            }
          </div>
        ))}
      </section>
    );
  }
}

export function mapStateToProps(state) {
  const imageEntity = _get(state, 'entities.image');
  const keys = Object.keys(imageEntity);
  const images = keys.map(k => imageEntity[k]);

  return {
    images,
  };
}


export default connect(mapStateToProps, null)(IndexSection);
