import React from "react";
import PlacesAutocomplete from 'react-places-autocomplete';
import {
    geocodeByAddress,
    getLatLng,
  } from 'react-places-autocomplete';



  class LocationSearchInput extends React.Component {

  
    constructor(props) {
      super(props);
      this.state = { address: '' };

    
    }
   
    handleChange = address => {
      this.setState({ address });
    };
   
    handleSelect = address => {
      geocodeByAddress(address)
        .then(results => getLatLng(results[0]))
        .then(latLng => {
          console.log('Success')
          this.setState({address})
          this.props.getCoordsFromAddress(latLng)
        })
        .catch(error => console.error('Error', error));
    };
   
    render() {
      return (
      <div className = 'autocomplete-div'> 
    
        <PlacesAutocomplete
          value={this.state.address}
          onChange={this.handleChange}
          onSelect={this.handleSelect}
        >
          {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
            <div>
                <label> Enter your address </label>
                <input
                    {...getInputProps({
                    placeholder: '...',
                    className: 'location-search-input',
                    })}
                />
                <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.map((suggestion, index) => {
                    const className = suggestion.active
                        ? 'suggestion-item--active'
                        : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                        ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                        : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                        <div key = {index}
                        {...getSuggestionItemProps(suggestion, {
                            className,
                            style,
                        })}
                        >
                        <span>{suggestion.description}</span>
                        </div>
                    );
                    })}
                </div>
                </div>
            )}
            </PlacesAutocomplete>
        </div>
      );
    }
  }

  export default LocationSearchInput;