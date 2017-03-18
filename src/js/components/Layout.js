'use strict';
require('../../index.css')
var React = require('react')
var DataGrid = require('react-datagrid')
var {
  AsyncStorage,
  Text,
  View
} = ReactNative;
var sorty = require('sorty')
import Footer from "./Footer";
import Header from "./Header";
import { BootstrapTable, TableHeaderColumn } from 'react-bootstrap-table';
var data = [
  {
    "id": 1,
    "first_name": "Larry",
    "last_name": "Russell",
    "email": "lrussell0@patch.com",
    "gender": "Male",
    "ip_address": "196.4.246.140"
  },
  {
    "id": 2,
    "first_name": "Martha",
    "last_name": "Gibson",
    "email": "mgibson1@who.int",
    "gender": "Female",
    "ip_address": "213.55.7.162"
  },
  {
    "id": 3,
    "first_name": "Gerald",
    "last_name": "Spencer",
    "email": "gspencer2@myspace.com",
    "gender": "Male",
    "ip_address": "212.45.115.135"
  },
  {
    "id": 4,
    "first_name": "Marilyn",
    "last_name": "Graham",
    "email": "mgraham3@upenn.edu",
    "gender": "Female",
    "ip_address": "25.113.3.177"
  },
  {
    "id": 5,
    "first_name": "Carl",
    "last_name": "Howell",
    "email": "chowell4@opera.com",
    "gender": "Male",
    "ip_address": "208.0.51.79"
  },
  {
    "id": 6,
    "first_name": "Ronald",
    "last_name": "Richardson",
    "email": "rrichardson5@mac.com",
    "gender": "Male",
    "ip_address": "35.68.91.91"
  },
  {
    "id": 7,
    "first_name": "Jessica",
    "last_name": "Thomas",
    "email": "jthomas6@cnn.com",
    "gender": "Female",
    "ip_address": "252.242.232.230"
  },
  {
    "id": 8,
    "first_name": "Annie",
    "last_name": "Reid",
    "email": "areid7@rambler.ru",
    "gender": "Female",
    "ip_address": "54.158.140.53"
  }
]
var SORT_INFO = [
  { name: 'id', dir: 'asc' }
]

var columns = [
  { name: 'id', type: 'number' },
  { name: 'gender', flex: 1 },
  { name: 'ip_address', flex: 1 },
  { name: 'first_name', flex: 2 },
  { name: 'last_name', flex: 2 },
  { name: 'email', width: 200 }
]

function sort(arr) {
  return sorty(SORT_INFO, arr)
}
//sort data array with the initial sort order
data = sort(data)

var MyDataGrid = React.createClass({
  render: function () {
    return <DataGrid
      idProperty='id'
      dataSource={data}
      columns={columns}
      style={{ height: 400 }}

      sortInfo={SORT_INFO}
      onSortChange={this.handleSortChange}

      onColumnOrderChange={this.handleColumnOrderChange}
    />
  },
  handleSortChange: function (sortInfo) {
    SORT_INFO = sortInfo

    data = sort(data)

    this.setState({})
  },
  handleColumnOrderChange: function (index, dropIndex) {
    var col = columns[index]
    columns.splice(index, 1) //delete from index, 1 item
    columns.splice(dropIndex, 0, col)
    this.setState({})
  }
})
var STORAGE_KEY = '@AsyncStorageExample:key';
export default class Layout extends React.Component {
  constructor() {
    super();
    this.setSelectedOption = this.setSelectedOption.bind(this);
    this.getInitialState = this.getInitialState.bind(this);
    this.state = {
      title: "Welcome",
      MyGrid: MyDataGrid,
    };
  }

  componentDidMount() {
    this._loadInitialState().done();
  }
  _loadInitialState = async () => {
    try {
      var value = await AsyncStorage.getItem(STORAGE_KEY);
      if (value !== null) {
        this.setState({ selectedValue: value });
        this._appendMessage('Recovered selection from disk: ' + value);
      } else {
        this._appendMessage('Initialized with no selection on disk.');
      }
    } catch (error) {
      this._appendMessage('AsyncStorage error: ' + error.message);
    }
  };

  changeTitle(title) {
    this.setState({ title });
  }

  render() {
    return (
      <div>
        <Header changeTitle={this.changeTitle.bind(this)} title={this.state.title} />
        <MyDataGrid />
        <BootstrapTable ref='table' data={data} multiColumnSort={2}>
          <TableHeaderColumn dataField='id' isKey={true} dataSort={true}>ID</TableHeaderColumn>
          <TableHeaderColumn dataField='first_name' dataSort={true}>First Name</TableHeaderColumn>
        </BootstrapTable>
      </div>
    );
  }
}