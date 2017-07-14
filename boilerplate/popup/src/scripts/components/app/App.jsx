import React, {Component} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    chrome.tabs.query({currentWindow: true, active: true}, function(tabs){
        console.log(tabs[0].url);
    });

    return (
      <div>
        Wowowowowowowow
      </div>
    );
  }
}

export default App;
