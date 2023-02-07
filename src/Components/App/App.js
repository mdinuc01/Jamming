import React from "react";
import "./App.css";
import SearchBar from "../SearchBar/SearchBar";
import SearchResults from "../SearchResults/SearchResults";
import Playlist from "../Playlist/Playlist";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [
        {
          name: "Determinate",
          artist: "Various Artists",
          album: "Lemonade Mouth",
          id: 1
        },
        {
          name: "Turn Up the Music",
          artist: "Various Artists",
          album: "Lemonade Mouth",
          id: 2
        },
        {
          name: "Breakthrough",
          artist: "Various Artists",
          album: "Lemonade Mouth",
          id: 3
        }
      ],
      playlistName: "New Playlist",
      playlistTracks: [
        {
          name: "Way Less Sad",
          artist: "AJR",
          album: "Ok Orchestra",
          id: 4
        },
        {
          name: "World's Smallest Violin",
          artist: "AJR",
          album: "Ok Orchestra",
          id: 5
        },
        {
          name: "Bang!",
          artist: "AJR",
          album: "Ok Orchestra",
          id: 6
        }
      ]
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
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
      track => track.id != removeTrack.id
    );
    this.setState({ playlistTracks: tempTracks });
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className="highlight">mmm</span>ing
        </h1>
        <div className="App">
          <SearchBar />
          <div className="App-playlist">
            <SearchResults
              searchResults={this.state.searchResults}
              onAdd={this.addTrack}
            />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
