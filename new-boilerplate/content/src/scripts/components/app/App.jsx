import React, {Component, Text} from 'react';
import Sidebar from 'react-sidebar';


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
    document.addEventListener('click', () => {
      this.setState({
        sidebarOpen: !sidebarOpen
      })
    })
  }

  render() {
    var sidebarContent = <b>Sidebar content</b>;
    return (
      <div>
      <Sidebar sidebar={sidebarContent}
         open={this.state.sidebarOpen}
         onSetOpen={this.onSetSidebarOpen}
        
      >
      </Sidebar>
    </div>
    );
  }
}

export default App;
