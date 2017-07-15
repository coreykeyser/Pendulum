import React, {Component, Text} from 'react';



class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Relevant Page Information:',
      sidebarOpen: true
    }
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  onSetSidebarOpen(open) {
    this.setState({sidebarOpen: open});
  }

  getMetadata(name) {
   var metas = document.getElementsByTagName('meta');
   for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("name") === name) {
         return metas[i].getAttribute("content");
      }
   }
    return "";
}

  getMetadataOG(property) {
   var metas = document.getElementsByTagName('meta');
   for (var i = 0; i < metas.length; i++) {
      if (metas[i].getAttribute("property") === property) {
         return metas[i].getAttribute("content");
      }
   }
    return "";
}

  componentDidMount() {
    let title = this.getMetadata('title');
    if (!title) {
      title = this.getMetadataOG('og:title');
    }
    const keywords = this.getMetadata('news_keywords');
    if (!keywords) {
      title = this.getMetadataOG('keywords');
    }
    const description = this.getMetadata('description');
    this.setState({title});
    this.setState({keywords});
    this.setState({description});
    console.log('hi');
  }

  render() {
    return (
      <div>
        <h1>TEST TEST TEST TEST</h1>
        <h1>TEST TEST TEST TEST</h1>
        <h1>TEST TEST TEST TEST</h1>
        <h1>TEST TEST TEST TEST</h1>
        <h1>TEST TEST TEST TEST</h1>
      </div>
    );
  }
}

export default App;
