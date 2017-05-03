import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Asset } from 'expo';
import caseMap from '../content/cases.json';
import Markdown from 'react-native-simple-markdown';

export default class CaseScreen extends React.Component {
  state = {
    case: null,
    markdown: null,
  }

  constructor(props) {
    super(props);
    this.state.case = caseMap[this.props.route.params.id];
    this._loadMarkdown();
  }

  _loadMarkdown() {
    console.log("I should probably load some markdown.");
  }

  render() {
    const c = this.state.case;

    if (!c) {
      return <Text>Unknown case</Text>;
    }

    const content = this.state.markdown ? <Markdown>{this.state.markdown}</Markdown> : <Text>Loading...</Text>;

    return (
      <View>
        <Text>{c.name}</Text>
        {content}
      </View>
    );
  }
}

const styles = StyleSheet.create({});
