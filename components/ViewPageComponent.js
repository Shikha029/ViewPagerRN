/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet, Dimensions, ScrollView} from 'react-native';
import axios from 'axios';
import ViewPager from '@react-native-community/viewpager';
import ItemBubbles from './ItemBubbles';

const {height} = Dimensions.get('window');

const ViewPagerComponent = () => {
  const starwarsUrl = 'https://swapi.co/api/films/';
  const [movies, setMovies] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);

  const [characters, setCharacters] = useState({});
  const [planets, setPlanets] = useState({});
  const [starships, setStarships] = useState({});

  const [charactersLoading, setCharactersLoading] = useState(true);
  const [planetsLoading, setPlanetsLoading] = useState(true);
  const [starshipsLoading, setStarshipsLoading] = useState(true);

  useEffect(() => {
    axios.get(starwarsUrl)
    .then(res => {
      if (res.status === 200) {
        let movieData = res.data.results;
        if (movieData.length) {
          const sortedMovies = movieData.sort((movie1, movie2) => new Date(movie1.release_date) - new Date(movie2.release_date));
          setMovies(sortedMovies);
          getMultipleApiData(sortedMovies, 0);
        }
      }
    })
    .catch(error => {
      console.log(error);
    });
  }, []);

  const getMultipleApiData = (movieData, index) => {
    const axiosCharacterRequests = [];
    const axiosPlanetRequests = [];
    const axiosStarshipRequests = [];

    const characterApis = movieData[index].characters;
    const planetApis = movieData[index].planets;
    const starshipApis = movieData[index].starships;

    // character apis
    characterApis.forEach((api) => {
      axiosCharacterRequests.push(axios.get(api));
    });
    axios.all(axiosCharacterRequests).then(axios.spread((...responses) => {
      const characterItems = [];
      responses.forEach((item, index) => {
        characterItems.push(item.data.name);
      });
      let currentCharacters = characters;
      currentCharacters[index] = characterItems;
      setCharacters(currentCharacters);
      setCharactersLoading(false);
    })).catch(errors => {
        console.log(errors);
    });

    // planet apis
    planetApis.forEach((api) => {
      axiosPlanetRequests.push(axios.get(api));
    });
    axios.all(axiosPlanetRequests).then(axios.spread((...responses) => {
      const planetItems = [];
      responses.forEach((item, index) => {
        planetItems.push(item.data.name);
      });
      let currentPlanets = planets;
      currentPlanets[index] = planetItems;
      setPlanets(currentPlanets);
      setPlanetsLoading(false);
    })).catch(errors => {
        console.log(errors);
    });

    // starship apis
    starshipApis.forEach((api) => {
      axiosStarshipRequests.push(axios.get(api));
    });
    axios.all(axiosStarshipRequests).then(axios.spread((...responses) => {
      const starshipItems = [];
      responses.forEach((item, index) => {
        starshipItems.push(item.data.name);
      });
      let currentStarships = starships;
      currentStarships[index] = starshipItems;
      setStarships(currentStarships);
      setStarshipsLoading(false);
    })).catch(errors => {
        console.log(errors);
    });
  };

  const onPageSelected = (e) => {
    const pageNumber = e.nativeEvent.position;
    setCurrentPage(pageNumber);

    // check if data is loaded/api called
    if (!characters[pageNumber] && !planets[pageNumber] && !starships[pageNumber]) {
      setCharactersLoading(true);
      setPlanetsLoading(true);
      setStarshipsLoading(true);
      getMultipleApiData(movies, pageNumber);
    } else {
      setCharactersLoading(false);
      setPlanetsLoading(false);
      setStarshipsLoading(false);
    }
  };

  const getFormattedDate = (date) => {
    const dateString = new Date(date);
    return dateString.getDate() + '-' + (dateString.getMonth() + 1) + '-' + dateString.getFullYear();
  };

  return (
    <View>
      {
        movies.length > 0 && (
          <ViewPager
            style={styles.viewPager}
            initialPage={0}
            scrollEnabled={true}
            onPageSelected={onPageSelected}>
            {
              movies.map((movie, index) => (
                <ScrollView contentContainerStyle={styles.growflex} key={index}>
                <View style={styles.pageContainer}>
                  <View style={styles.infoContainer}>
                    <Text style={styles.highlightLabel}>Title: </Text>
                    <Text style={styles.infoLabel}>{movie.title}</Text>
                  </View>
                  <View style={styles.infoContainer}>
                    <Text style={styles.highlightLabel}>Release Date: </Text>
                    <Text style={styles.infoLabel}>{getFormattedDate(movie.release_date)}</Text>
                  </View>
                    <ItemBubbles
                      type={'CHARACTERS'}
                      loading={charactersLoading}
                      itemData={characters[currentPage]} />

                    <ItemBubbles
                      type={'PLANETS'}
                      loading={planetsLoading}
                      itemData={planets[currentPage]} />

                    <ItemBubbles
                      type={'STARSHIPS'}
                      loading={starshipsLoading}
                      itemData={starships[currentPage]} />
                </View>
                </ScrollView>
              ))
            }
          </ViewPager>
        )
      }
    </View>
  );
};

const styles = StyleSheet.create({
  growflex: {
    flexGrow: 1,
  },
  pageContainer: {
    padding: '4%',
  },
  viewPager: {
    flexGrow: 1,
    height,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  highlightLabel: {
    fontWeight: 'bold',
    fontSize: 17,
  },
  infoLabel: {
    fontSize: 17,
  },
});

export default ViewPagerComponent;
