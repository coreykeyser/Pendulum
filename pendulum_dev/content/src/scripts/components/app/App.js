import React, {Component, Text} from 'react';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: 'Relevant Page Information:'
    }  
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
    setInterval(() => {
      this.setState({
        count: this.state.count + 1
      });
    }, 1000);
    console.log('hi');
    console.log(document.baseURI);
    const title = this.getMetadata('title') || this.getMetadataOG('og:title') || document.getElementsByTagName('title');
   
    const keywords = this.getMetadata('news_keywords') || this.getMetadata('keywords') || this.getMetadataOG('keywords');
   
    const description = this.getMetadata('description');
    this.setState({title});
    this.setState({keywords});
    this.setState({description});

  }

  render() {

    return (
         <div>
        {/* <h3>{this.state.message}</h3>
        <h3>URL: {document.baseURI}</h3>
        <h3>Title: {this.state.title}</h3>
        <h3>Description: {this.state.description}</h3>
        <h3>Keywords: {this.state.keywords}</h3> */}
      </div>
    );
  }
}

export default App;
