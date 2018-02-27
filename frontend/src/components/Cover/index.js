import React, { Component } from 'react';
import './Cover.css';
import _ from 'lodash';

import CoverOverlay from '../CoverOverlay';

export default class Cover extends Component {
    constructor(props) {
      super(props);
      this.state = { image_size: this.imageSize(window.innerWidth), mouseOver: false, mouseClick: false }
    }

    static propTypes = {
      comicData: React.PropTypes.object.isRequired,
      upVote: React.PropTypes.func.isRequired,
      upVoted: React.PropTypes.bool.isRequired
    }

    handleResize() {
      this.setState({ image_size: this.imageSize(window.innerWidth) });
    }

    componentDidMount() {
      window.addEventListener('resize', this.handleResize.bind(this));
    }

    componentWillUnmount() {
      window.removeEventListener('resize', this.handleResize.bind(this));
    }

    imageSize(width) {
      return (width < 768) ? 'portrait_uncanny' : 'portrait_fantastic' ;
    }

    showDetails(show) {
      this.setState({ mouseOver: show });
    }

    showOverlay(e) {
      e.stopPropagation();

      if (this.state.mouseClick) {
        this.setState({ mouseClick: false });
      } else {
        this.setState({ mouseClick: true });
      }
    }

    handleUpvoteClick(e) {
      e.stopPropagation();
      this.props.upVote.call(this);
    }

    coverDate() {
      const date = _.find(this.props.comicData.dates, ['type', 'onsaleDate']);
      return new Date(date.date).getFullYear();
    }


    coverUpvoted() {
      if(!this.props.upVoted) { return null; }

      return (<div className="cover-upvoted">
          <div className="cover-heart-on"></div>
        </div>);
    }

    renderDetail() {
      if (!this.state.mouseOver) { return null; }

      return (
        <div className="cover-detail">
          <div className="cover-heart" onClick={ this.handleUpvoteClick.bind(this) }></div>
          <div className="cover-footer">
            <div className="cover-title">
              { this.props.comicData.title }
            </div>
            <div>
              <span className="cover-issue"># { this.props.comicData.issueNumber }</span>
              <span className="cover-year">{ this.coverDate.call(this) }</span>
            </div>
          </div>
        </div>
        );
    }

    renderOverlay() {
      if (!this.state.mouseClick) { return null; }  

      return (
        <CoverOverlay
          click={ this.showOverlay.bind(this) }
          comic={ this.props.comicData }
          cover={ this.coverImage.call(this) }
          image_size={ this.state.image_size } />
      );
    }

    coverImage() {
      return `${this.props.comicData.thumbnail.path}/${this.state.image_size}.${this.props.comicData.thumbnail.extension}`;
    }

    render() {
      return (
        <div href="#overlay" className="pure-u-23-24 pure-u-md-1-4 pure-u-lg-1-5"
          onMouseEnter={ this.showDetails.bind(this, true) }
          onMouseLeave={ this.showDetails.bind(this, false) }>

          <div className="cover"
            onClick={ this.showOverlay.bind(this) }>

            <img className="cover-image" alt={ this.props.comicData.title } src={ this.coverImage.call(this) } />
            { this.renderDetail() }
            { this.coverUpvoted() }
          </div>
          { this.renderOverlay() }
        </div>
      );
    }
}