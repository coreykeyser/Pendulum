import React from 'react'
import ReactDOM from 'react-dom'

import algoliasearch from 'algoliasearch';
import targeter from './targeter';
import domains from './domains';
import setting from './setting';
var client = algoliasearch( "X7PCU0DXSK", "98acb999c0ae71e22cd9ed8e8780adae" );

const Preview = ({ }) => {
    return (
        <div></div>
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
                <ul>
                    { this.state.suggestions.map( (x, idx) => (
                        <li key={idx}>{ x.author }</li>
                    ) ) }
                </ul>
            </div>
        );
    }
};

ReactDOM.render( <Items />,
    document.getElementById( 'root' ) );