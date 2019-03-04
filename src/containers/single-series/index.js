import React, { Component } from 'react';
import ajaxLoader from '../../components/ajax-loader/ajax-loader.gif'

class SingleSeries extends Component {
  state = {  
    show: null
  }

  componentDidMount() {
    fetch(`http://api.tvmaze.com/shows/${this.props.match.params.id}?embed=episodes`)
    .then(response => response.json() )
    .then( json => this.setState({ show: json }) )
  }
  render() { 
    const { show } = this.state;

    return ( 
      <div>
        { show === null && <img
            alt="Loader Pix"
            src={ajaxLoader} />}
        {
          show !== null && 
          <div>
            <p>{ show.name }</p>
            <p>Premiered - { show.premiered }</p>
            <p>Rating - { show.rating.average }</p>
            <p>Episodes - { show._embedded.episodes.length }</p>
            <p>
              <img
                alt="Show Pix"
                src={ show.image.medium } 
              />
            </p>
          </div>
        }
      </div>
    );
  }
}
 
export default SingleSeries;