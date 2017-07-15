import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';
import $ from 'jquery';
import {Items, Home} from './algolia';
import parsedomain from 'parse-domain';

const TODO_FILTERS = {
    [SHOW_ALL]: () => true,
    [SHOW_ACTIVE]: todo => !todo.completed,
    [SHOW_COMPLETED]: todo => todo.completed
};

export default class MainSection extends Component {

    static propTypes = {
        todos: PropTypes.array.isRequired,
        actions: PropTypes.object.isRequired
    };

    constructor( props, context ) {
        super( props, context );
        this.state = {
            filter: SHOW_ALL,
            message: 'Relevant Page Information:',
            url: '',
            html: ''
        };
    }

    handleClearCompleted = () => {
        const atLeastOneCompleted = this.props.todos.some( todo => todo.completed );
        if ( atLeastOneCompleted ) {
            this.props.actions.clearCompleted();
        }
    };

    handleShow = ( filter ) => {
        this.setState( { filter } );
    };

    renderToggleAll( completedCount ) {
        const { todos, actions } = this.props;
        if ( todos.length > 0 ) {
            return (
                <input
                    className={ style.toggleAll }
                    type="checkbox"
                    checked={ completedCount === todos.length }
                    onChange={ actions.completeAll }
                />
            );
        }
    }

    renderFooter( completedCount ) {
        const { todos } = this.props;
        const { filter } = this.state;
        const activeCount = todos.length - completedCount;

        if ( todos.length ) {
            return (
                <Footer
                    completedCount={ completedCount }
                    activeCount={ activeCount }
                    filter={ filter }
                    onClearCompleted={ this.handleClearCompleted }
                    onShow={ this.handleShow }
                />
            );
        }
    }


    getMetadata( name, doc ) {
        var metas = doc.getElementsByTagName( 'meta' );
        for ( var i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute( "name" ) === name ) {
                return metas[i].getAttribute( "content" );
            }
        }
        return "";
    }
    getMetadataOG( property, doc ) {
        var metas = doc.getElementsByTagName( 'meta' );
        for ( var i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute( "property" ) === property ) {
                return metas[i].getAttribute( "content" );
            }
        }
        return "";
    }

    extractHostname( url ) {
        var hostname;
        //find & remove protocol (http, ftp, etc.) and get hostname

        if ( url.indexOf( "://" ) > -1 ) {
            hostname = url.split( '/' )[2];
        }
        else {
            hostname = url.split( '/' )[0];
        }

        //find & remove port number
        hostname = hostname.split( ':' )[0];
        //find & remove "?"
        hostname = hostname.split( '?' )[0];

        return hostname;
    }

    extractRootDomain( url ) {
        var domain = this.extractHostname( url ),
            splitArr = domain.split( '.' ),
            arrLen = splitArr.length;

        //extracting the root domain here
        if ( arrLen > 2 ) {
            domain = splitArr[arrLen - 2] + '.' + splitArr[arrLen - 1];
        }
        return domain;
    }

    componentDidMount() {
        setInterval(() => {
            this.setState( {
                count: this.state.count + 1
            } );
        }, 1000 );
        chrome.tabs.query( { 'active': true, 'lastFocusedWindow': true }, ( tabs ) => {
            $.get( tabs[0].url, ( html ) => {
                var parser = new DOMParser();
                var doc = parser.parseFromString( html, 'text/html' )
                const title = this.getMetadata( 'title', doc ) || this.getMetadataOG( 'og:title', doc ) || doc.getElementsByTagName( 'title' );
                const keywords = this.getMetadata( 'news_keywords', doc ) || this.getMetadata( 'keywords', doc ) || this.getMetadataOG( 'keywords', doc );
                const description = this.getMetadata( 'description', doc );
                this.setState( { title, keywords, description, url: tabs[0].url } );
                document.addEventListener( 'click', () => {
                    this.setState( {
                        sidebarOpen: !sidebarOpen
                    } )
                } )
            } ).bind( this );
        } ).bind( this );


    }

    render() {
        const { todos, actions } = this.props;
        const { filter } = this.state;

        const filteredTodos = todos.filter( TODO_FILTERS[filter] );
        const completedCount = todos.reduce(
            ( count, todo ) => ( todo.completed ? count + 1 : count ),
            0
        );
        console.log( 'start the engine' );
        var domain = this.extractRootDomain( this.state.url );
        console.log( domain );
        return (
            <section className={ style.main }>
                <div style={ { zIndex: 9999, backgroundColor: 'white' } }>
                    { this.state.keywords ? <Items dom={ domain } keywords={ this.state.keywords.slice().split( ',' ).slice( 0, 2 ).toString() } /> : <h1>Pendulum</h1> }
                </div>
            </section>
        );
    }
}
