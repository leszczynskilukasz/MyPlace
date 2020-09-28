import React, { Component } from 'react';
import {
  View,
  TextInput,
  StatusBar,
  ScrollView,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import PropTypes from 'prop-types';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { GoogleAutoComplete } from 'react-native-google-autocomplete';
import styles from './styles.android';
import API_KEY from '../key';

class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mapRegion: {
        latitude: 50.288220,
        longitude: 18.677610,
        latitudeDelta: 0.000922,
        longitudeDelta: 0.000421,
      },
    };
  }

  _handleMapRegionChange = (mapRegion) => {
    this.setState({ mapRegion });
  };

  searchPlace = async (placeId, fetchDetails, clearSearch) => {
    const place = await fetchDetails(placeId);
    this.setState((prevState) => ({ mapRegion: { ...prevState.mapRegion, latitude: place.geometry.location.lat, longitude: place.geometry.location.lng } }), clearSearch);
  };

  render() {
    const { mapRegion } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={mapRegion}
          mapType="standard"
          onPoiClick={(e) => navigation.navigate('PlaceInfo', { place: e.nativeEvent })}
        />
        <View>
          <GoogleAutoComplete apiKey={API_KEY} debounce={300} minLength={2} queryTypes="establishment">
            {({
              handleTextChange, locationResults, fetchDetails, isSearching, clearSearch,
            }) => (
              <>
                <View>
                  <View style={styles.searchSegment}>
                    <TextInput
                      style={styles.textInputSearch}
                      placeholder="Search"
                      onChangeText={handleTextChange}
                    />
                    <TouchableOpacity style={styles.buttonClearSearch} onPress={clearSearch}>
                      <AntDesign name="closecircleo" size={40} />
                    </TouchableOpacity>
                  </View>
                  {isSearching && <ActivityIndicator style={styles.loadingIndicator} size="large" color="green" />}
                  <ScrollView>
                    {locationResults.map((location) => (
                      <TouchableOpacity key={location.id} onPress={() => this.searchPlace(location.place_id, fetchDetails, clearSearch)}>
                        <Text key={location.place_id} style={styles.textLocation}>{location.description}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </>
            )}
          </GoogleAutoComplete>
        </View>
      </View>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

export default Main;
