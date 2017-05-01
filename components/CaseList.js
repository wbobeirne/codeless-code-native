import React, { PropTypes } from 'react';
import { ListView, StyleSheet, Text } from 'react-native';
import CaseRow from "../components/CaseRow";

export default class CaseList extends React.Component {
  constructor(props) {
    super(props);
    this._renderRow = this._renderRow.bind(this);
  }

	componentWillMount() {
		this._setCasesDataSource(this.props.cases);
	}

	componentWillReceiveProps(newProps) {
		if (this.props.cases !== newProps.cases) {
			this._setCasesDataSource(newProps.cases);
		}
	}

	_setCasesDataSource(cases) {
		const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
		this.setState({ dataSource: ds.cloneWithRows(cases) });
	}

  _renderRow(c) {
    return <CaseRow {...c} onPress={this.props.onPress} />;
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this._renderRow}
        style={styles.container}>
      </ListView>
    );
  }
}

CaseList.propTypes = {
	cases: PropTypes.array,
  onPress: PropTypes.func,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
