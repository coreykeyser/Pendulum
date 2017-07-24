import _ from 'underscore';
import domains from './domains';

export default ( keywords, id ) => {
    var range = [];
    var target = [];
    var queries = [];
    var rootIdeology = isNaN(id) ? 0 : id;
    if ( rootIdeology === 0 ) {
        range = [3, 2, -2, -3];
    } else if ( rootIdeology === 1 || rootIdeology === 2 || rootIdeology === 3 ) {
        range = [-1, -2, -3];
    } else if ( rootIdeology === -1 || rootIdeology === -2 || rootIdeology === -3 ) {
        range = [1, 2, 3];
    }
    var domainZ = _.pairs( domains )
    for ( var x = 0; x < range.length; x++ ) {
        for ( var i = 0; i < domainZ.length; i++ ) {
            if ( domainZ[i][1] === range[x] ) {
                target.push( domainZ[i][0] )
            }
        }
    }
    for ( var y = 0; y < target.length; y++ ) {
        queries.push( { indexName: target[y], query: keywords } )
    }
    return queries;
}
