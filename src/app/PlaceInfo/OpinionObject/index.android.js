import React, { Component } from 'react';
import firebase from 'firebase';
import 'firebase/firestore';
import ReadMore from 'react-native-read-more-text';
import PropTypes from 'prop-types';
import { View, Text, ActivityIndicator } from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import styles from './styles.android';

class Opinion extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nickname: null,
    };
  }

  componentWillMount() {
    this.getUser();
  }

  getUser = async () => {
    const { data } = this.props;
    const user = await firebase.firestore().collection('users').doc(data.id).get();
    this.setState({ nickname: user.data().nickname });
  }

  showMore = (handlePress) => (
    <Text style={styles.showComment} onPress={handlePress}>Read more</Text>
  )

  showLess = (handlePress) => (
    <Text style={styles.showComment} onPress={handlePress}>Show less</Text>
  )


  render() {
    const { nickname } = this.state;
    const { data } = this.props;
    return (
      nickname ? (
        <View style={styles.opinionContainer}>
          <View style={styles.textAuthorAndDateContainer}>
            <Text style={styles.textNickname}>{`Author: ${nickname}`}</Text>
            <View style={styles.textOpinionRating}>
              <Text>{data.data().rating}</Text>
              <MaterialIcons style={styles.iconStarOpinion} name="star" size={15} color="gold" />
            </View>
            <Text>{new Date(data.data().createdAt.toDate()).toDateString().substring(4, 15)}</Text>
          </View>
          <ReadMore
            numberOfLines={3}
            style={styles.textOpinion}
            renderTruncatedFooter={this.showMore}
            renderRevealedFooter={this.showLess}
          >
            {data.data().opinion}
          </ReadMore>
        </View>
      ) : <ActivityIndicator style={styles.loadingIndicator} />
    );
  }
}

Opinion.propTypes = {
  data: PropTypes.shape({
    data: PropTypes.func,
    id: PropTypes.string,
  }).isRequired,
};

export default Opinion;
