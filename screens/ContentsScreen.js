import React from 'react';
import { ListView, Text } from 'react-native';
import CaseList from "../components/CaseList";
import caseMap from "../content/cases.json";
import Router from "../navigation/Router";

const caseList = Object.keys(caseMap).map((id) => {
  return caseMap[id];
});

export default class ContentsScreen extends React.Component {
  static route = {
    navigationBar: {
      title: 'Cases',
    },
  };

  state = {
    cases: caseList.sort((a, b) => a.date < b.date),
  };

  constructor(props) {
    super(props);
    this._onCasePress = this._onCasePress.bind(this);
  }

  _onCasePress(c) {
    console.log(c);
    this.props.navigator.push(Router.getRoute("case", { id: c.id }));
  }

  render() {
    return (
      <CaseList
        cases={this.state.cases}
        onPress={this._onCasePress}
      />
    );
  }
}
