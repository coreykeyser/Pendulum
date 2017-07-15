const webhoseio = require( 'webhoseio' );
const algoliasearch = require( 'algoliasearch' );
var algoliaClient = algoliasearch( "X7PCU0DXSK", "98acb999c0ae71e22cd9ed8e8780adae" );
const webhoseClient = webhoseio.config( { token: '21435336-aeb3-4651-99ba-7b51deeb57a6' } );
const { domains } = require( './domains' );

let domainIdx = 0;

const nextResponse = ( index ) => {
    let values;
    webhoseClient.getNext()
        .then( output => {
            values = output;
            index.addObjects( output.posts, ( err, content ) => { } );
        } )
        .then(() => {
            if ( values.moreResultsAvailable > 0 ) {
                nextResponse( index );
            } else if ( domainIdx < domains.length ) {
                domainIdx++;
                nextDomain();
            }
        } );
}

const nextDomain = () => {
    const search = {
        site: domains[domainIdx],
        site_type: 'news',
        is_first: true,
    }

    var index = algoliaClient.initIndex( domains[domainIdx] );
    let values;

    webhoseClient.query( 'filterWebContent', search )
        .then( output => {
            values = output;
            index.addObjects( output.posts, ( err, content ) => { } );
        } )
        .then(() => {
            if ( values.moreResultsAvailable > 0 ) {
                nextResponse( index );
            } else if ( domainIdx < domains.length ) {
                domainIdx++;
                nextDomain();
            }
        } );
}

nextDomain();
console.log( 'Search Complete' );
