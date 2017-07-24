import React from 'react'
import ReactDOM from 'react-dom'

import algoliasearch from 'algoliasearch';
import targeter from './targeter';
import domains from './domains';
var client = algoliasearch( "X7PCU0DXSK", "98acb999c0ae71e22cd9ed8e8780adae" );

const Preview = ( { info } ) => {
    console.log( info )
    return (
        // <div className="container" style={{display:'flex', background: 'white'}}>
        //     <div className="imageDiv" style={{display: 'flex', alignItems: 'center'}}>
        //         {info.thread.main_image === "" || info.thread.site === "theguardian.com" ?
        //         (<img src="http://cdn8.openculture.com/wp-content/uploads/2012/09/BurroughsShotgunArt.jpeg" />) : (<img src={info.thread.main_image} />)}
        //     </div>
        //     <div className="textBox">
        //     <div>
        //         <a href={info.url} target="/blank"><h1>{info.title}</h1></a>
        //         <a href={"http://" + info.thread.site} target="/blank"><h2 style={{display: 'flex', justifyContent: 'center'}}>{info.thread.site}</h2></a>
        //     </div>
        //     <div className="restInfo">
        //         <div className="smallText">{info.text.substring(0, 300)}...</div>
        //     </div>
        //     </div>
        // </div>
        <div>
        <div className="container" style={{display:'flex', background: 'white', border: '1 solid black'}}>
            <div className="imageDiv" style={{display: 'flex', alignItems: 'center'}}>
                {info.thread.main_image === "" || info.thread.site === "theguardian.com" ?
                (<img src="http://cdn8.openculture.com/wp-content/uploads/2012/09/BurroughsShotgunArt.jpeg" />) : (<img src={info.thread.main_image} />)}
            </div>
            <div className="textBox">
                <div><a href={info.url} target="/blank"><h2 className="fucker">{info.title}</h2></a></div>
                
                <div><h4 style={{display: 'flex', justifyContent: 'center'}}><a href={"http://"+info.thread.site} target="/blank">{info.thread.site}</a></h4></div>
                <div>{info.text.substring(0, 160)}...</div>
            </div>
            
        </div>
    </div>
    );
}

class Home extends React.Component {
    render () {
        return (
            <div className="containder">
                <a className="pop" onClick={this.openModal}><div className="title">Pendulum</div></a>
                <div className="follow">diverse news from a partisan world...</div>
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
        for ( var i = 0; i < content.results.length; i++ ) {
            if ( content.results[i].hits[0] ) {
                suggestions.push( content.results[i].hits[0] )
            }
        }
        this.setState( { suggestions } );
    }

    componentDidMount() {
        const queries = targeter( this.props.keywords, domains[this.props.dom] )
        client.search( queries, this.searchCallback.bind( this ) )
    }

    render() {
        return (
            <div>
                <div style={{backgroundColor: '#DC143C', color: 'white'}}>
                    <br />
                <h1 style={{display: "flex", justifyContent: "center"}}><u>PENDULUM</u></h1>
                <h3 style={{display: "flex", justifyContent: "center"}}>Diverse stories from a partisan world</h3>
                <br />
                </div>
                { this.state.suggestions.map(( info, idx ) =>
                    <Preview key={ idx } info={ info } />
                ) }
            </div>
        );
    }
};

export {Items, Home};
