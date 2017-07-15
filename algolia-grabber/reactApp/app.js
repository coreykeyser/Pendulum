import React from 'react'
import ReactDOM from 'react-dom'
import Modal from 'react-modal';
import algoliasearch from 'algoliasearch';
import targeter from './targeter';
import domains from './domains';
import setting from './setting';
var client = algoliasearch( "X7PCU0DXSK", "98acb999c0ae71e22cd9ed8e8780adae" );

const Preview = ({ info}) => {
    console.log(info)
    return (
        <div>
        <div className="container" style={{display:'flex', background: 'white'}}>
            <div className="imageDiv" style={{display: 'flex', alignItems: 'center'}}>
                {info.thread.main_image === "" || info.thread.site === "theguardian.com" ?
                (<img src="http://cdn8.openculture.com/wp-content/uploads/2012/09/BurroughsShotgunArt.jpeg" />) : (<img src={info.thread.main_image} />)}
            </div>
            <div className="textBox">
                <a href={info.url} target="/blank"><h1>{info.title}</h1></a>
                <h2 style={{display: 'flex', justifyContent: 'center'}}>{info.thread.site}</h2>
                <div>{info.text.substring(0, 350)}...</div>
            </div>
        </div>
    </div>
    );
}

class Home extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
        modalIsOpen: false
      };
      this.openModal = this.openModal.bind(this);
      this.afterOpenModal = this.afterOpenModal.bind(this);
      this.closeModal = this.closeModal.bind(this);
  }
      openModal() {
        this.setState({modalIsOpen: true});
      }
      afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
      }
      closeModal() {
        this.setState({modalIsOpen: false});
      }
    render () {
        return (
            <div className="containder">
                <a className="pop" onClick={this.openModal}><div className="title">Pendulum</div></a>
                <div className="follow">diverse news from a partisan world...</div>
                <div>
                    <Modal style={{overlay : {position: 'fixed', top: 200, left: 200, right: 200, bottom: 200,
                        backgroundColor: '#888888'}, content : {position: 'absolute', top: '40px', left: '40px',
                        right: '40px', bottom: '40px', border: '1px solid #ccc', background: '#fff', overflow: 'auto',
                        WebkitOverflowScrolling: 'touch', borderRadius: '4px', outline: 'none', padding: '20px'}}}
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        contentLabel="Example Modal">
                        <h2>Here is some bullshit about how the world doesn't listen to the other side. How every goddamn liberal thinks they are morally superior to every conservative, and every conservative thinks of every liberal as a hypocrite. At Pendulum, we don't give a fuck about what you think, we just want to make it easy for you get out of your little baby tribal brains, and start at least listening to the people you think are batshit crazy, who also happen to think of you as batshit crazy, all in the hopes that--in celebrating in our batshit craziness--we may be able to compromise on something (mic drop). So yeah, if you read an article, we will give you ten corresponding articles about the same content that are on the are from ideologically opposing media outlets. If you read the blaze, we give you Mother Jones, Salon, etc. If you read Huffington, we give you National Review. Our decisions on article suggestion are based on the recent studies in media bias from the PEW Research Group. OUR METHODOLOGY IS NOT PERFECT, we play into stereotypes about outlet ideology, and we work off the premise that media outlets are ideologically homogenous. We know they aren't, adn we will work to improve our practices. But, for now, this will do. </h2>
                    </Modal>
                </div>
            </div>
        )
    }
}

class Items extends React.Component {
    constructor( props ) {
        super( props );
        this.state = {
            suggestions: []
        }
    }

    searchCallback( err, content ) {
        const suggestions = [];
        if ( err ) {
            console.error( err );
            return;
        }
        for ( var i = 0; i < content.results.length; ++i ) {
            suggestions.push( content.results[i].hits[0] )
        }
        this.setState( { suggestions } );
    }

    componentDidMount() {
        const queries = targeter( domains[setting.rootSite] )
        client.search( queries, this.searchCallback.bind(this) )
    }

    render() {
        return (
            <div>
                <Home />
                { this.state.suggestions.map( (info, idx) =>
                    <Preview key={idx} info={info} />
                ) }
            </div>
        );
    }
};

ReactDOM.render( <Items />,
    document.getElementById( 'root' ) );
