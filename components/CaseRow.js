import React, { PropTypes } from 'react';
import { StyleSheet, Text, View, TouchableHighlight } from 'react-native';

export default class CaseRow extends React.Component {
  constructor(props) {
    super(props);
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
  				<Text style={styles.name}>
  					{this.props.id}: {this.props.name}
  				</Text>
  				<Text style={styles.date}>
  					{this.props.date}
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
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#CCC",
  },
});
