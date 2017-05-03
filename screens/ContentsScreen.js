import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CaseList from "../components/CaseList";
import caseMap from "../content/cases.json";
import Router from "../navigation/Router";
import { FONT_TITLE } from "../util/styles";

const caseList = Object.keys(caseMap).map((id) => {
  return caseMap[id];
});

export default class ContentsScreen extends React.Component {
  state = {
    cases: caseList.sort((a, b) => a.date < b.date),
  };

  constructor(props) {
    super(props);
    this._onCasePress = this._onCasePress.bind(this);
  }

  _onCasePress(c) {
    this.props.navigator.push(Router.getRoute("case", { id: c.id }));
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Cases</Text>
        <CaseList
          cases={this.state.cases}
          onPress={this._onCasePress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {
    ...FONT_TITLE,
    height: 100,
    lineHeight: 100,
    paddingLeft: 20,
    paddingRight: 20,
    fontSize: 48,
  },
});
