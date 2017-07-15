import React from 'react'
import ReactDOM from 'react-dom'

import algoliasearch from 'algoliasearch';
import targeter from './targeter';
import domains from './domains';
import setting from './setting';
var client = algoliasearch( "X7PCU0DXSK", "98acb999c0ae71e22cd9ed8e8780adae" );

const Preview = ({ info}) => {
    console.log(info)
    return (
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
    );
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
                { this.state.suggestions.map( (info, idx) =>
                    <Preview key={idx} info={info} />
                ) }
            </div>
        );
    }
};

ReactDOM.render( <Items />,
    document.getElementById( 'root' ) );
