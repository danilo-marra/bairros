import React, { Component } from 'react';
import './App.css';
import locais from './data/locais.json';
import Map from './Map';
import Menu from './Menu';

class App extends Component {
  state = {
    latitude: 40.722828,
    longitude: -73.996965,
    zoom: 8,
    all: locais,
    mapScriptAvailable: true,
    open: false,
    selectedIndex: null,
  }

  estilos = {
    botaoMenu: {
      marginLeft: 10,
      marginRight: 20,
      position: "absolute",
      left: 10,
      top: 20,
      background: "white",
      padding: 10
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

  componentDidMount = () => {
    this.setState({
      ...this.state,
      filtered: this.filterLocations(this.state.all, "")
    });
  }

  acionaMenu = () => {
    this.setState(
      {
        open: !this.state.open
      }
    );
  }

  atualizaQuery = (query) => {
    this.setState({
      ...this.state,
      selectedIndex: null,
      filtered: this.filterLocations(this.state.all, query)
    });
  }

  filterLocations = (locais, query) => {
    return locais.filter(locais => locais.name.toLowerCase().includes(query.toLowerCase()));
  }

  itemClick = (index) => {
    this.setState({ selectedIndex: index, open: !this.state.open})
  }

  render = () => {
    return (
      <div className="App">
        <div style={this.estilos.header}>
          <button onClick={this.acionaMenu} style={this.estilos.botaoMenu}>
            <i className="fa fa-bars"></i>
          </button>
          <h1>New York, Places to drink</h1>
        </div>
        <Map
          Lat={this.state.latitude}
          Lon={this.state.longitude}
          zoom={this.state.zoom}
          locais={this.state.filtered}
          selectedIndex={this.state.selectedIndex}
          itemClick={this.itemClick}
        />
        <Menu
          locais={this.state.filtered}
          open={this.state.open}
          acionaMenu={this.acionaMenu}
          filterLocations={this.atualizaQuery}
          itemClick={this.itemClick}
        />
      </div>
    );
  }
}

export default App;
