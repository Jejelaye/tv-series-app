import React, { Component } from 'react';
import SeriesList from '../../components/SeriesList';
import ajaxLoader from '../../components/ajax-loader/ajax-loader.gif';
import Intro from '../../components/Intro'

class Series extends Component {

  state = {
    series: [],
    seriesName : '',
    isFetching: false
  }

  onSeriesInputChange = e => {
    this.setState({ seriesName: e.target.value, isFetching: true });

    fetch(`http://api.tvmaze.com/search/shows?q=${e.target.value}`)
    .then(response => response.json() )
    .then( json => this.setState({ series: json, isFetching: false }) )
  }

  render() {
    const { series, seriesName, isFetching } = this.state;
    return (
      <div>
        <Intro message='Here you can find all of your most loved series' />
        <div>
          <input
            value={seriesName}
            type='text'
            onChange={ this.onSeriesInputChange } />
        </div>
        {
          !isFetching && series.length === 0 && seriesName.trim() === ''
          &&
          <p>Please enter series name into the field</p>
        }
        {
          !isFetching && series.length === 0 && seriesName.trim() !== ''
          &&
          <p> No TV series have been found with this name</p>
        }
        {
          isFetching && <p>
            <img
            alt="Loader Pix"
            src={ajaxLoader} />
            </p>
        }
        {
          !isFetching && <SeriesList list={this.state.series} />
        }

      </div>
    )
  }
}

export default Series;
