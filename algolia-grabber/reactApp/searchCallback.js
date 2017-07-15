export default ( err, content ) => {
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
