import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';
import moment from 'moment';
import { FONT_BODY } from '../util/styles';
import { DARKEST, DARKER, GREY } from '../util/colors';

export default class CaseRow extends React.Component {
  state = {
    time: "",
  };

  constructor(props) {
    super(props);

    this.state = {
      date: moment(this.props.date, "YYYY-MM-DD").format("LL"),
    };

    this._handlePress = this._handlePress.bind(this);
  }

  _handlePress() {
    if (this.props.onPress) {
      this.props.onPress({
        id: this.props.id,
        name: this.props.name,
        geekiness: this.props.geekiness,
        date: this.props.date,
      });
    }
  }

  render() {
    return (
      <TouchableHighlight
        underlayColor="#F9F9F9"
        activeOpacity={0.9}
        onPress={this._handlePress}
      >
        <View style={styles.container}>
  				<Text style={styles.name} numberOfLines={1}>
  					{this.props.id}: {this.props.name}
  				</Text>
  				<Text style={styles.date}>
  					{this.state.date}
  				</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

CaseRow.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string,
  geekiness: PropTypes.number,
  date: PropTypes.string,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    borderTopWidth: 1,
    borderTopColor: GREY,
  },
  name: {
    ...FONT_BODY,
    fontSize: 22,
    paddingBottom: 6,
    color: DARKEST,
  },
  date: {
    ...FONT_BODY,
    fontSize: 14,
    color: DARKER,
  }
});
