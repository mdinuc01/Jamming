import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";
import Spotify from "../../util/Spotifiy";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "New Playlist",
      playlistTracks: []
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.removeAllTracks = this.removeAllTracks.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  componentWillMount() {
    Spotify.getAccessToken();
  }

  addTrack(track) {
    let tempTracks = this.state.playlistTracks;
    if (!this.state.playlistTracks.includes(track)) {
      tempTracks.push(track);
    }
    this.setState({ playlistTracks: tempTracks });
  }

  removeTrack(removeTrack) {
    let tempTracks = this.state.playlistTracks.filter(
      track => track.id !== removeTrack.id
    );
    this.setState({ playlistTracks: tempTracks });
  }

  removeAllTracks() {
    this.setState({ playlistTracks: [] });
  }

  updatePlaylistName(newName) {
    this.setState({ playlistName: newName });
  }

  savePlaylist() {
    let trackURIs = this.state.playlistTracks.map(track => {
      return track.uri;
    });
    Spotify.savePlaylist(this.state.playlistName, trackURIs).then(resolve => {
      if (resolve)
        console.log(
          `Playlist ${this.state.playlistName} has saved to your account`
        );
      else console.log("ERROR!");
    });
  }

  search(searchTerm) {
    Spotify.search(searchTerm).then(searchResults => {
      this.setState({ searchResults: searchResults });
    });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onRemoveAll={this.removeAllTracks}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
