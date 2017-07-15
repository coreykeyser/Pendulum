import React, { Component, PropTypes } from 'react';
import TodoItem from './TodoItem';
import Footer from './Footer';
import { SHOW_ALL, SHOW_COMPLETED, SHOW_ACTIVE } from '../constants/TodoFilters';
import style from './MainSection.css';

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
            url: ''
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


    getMetadata( name ) {
        var metas = document.getElementsByTagName( 'meta' );
        for ( var i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute( "name" ) === name ) {
                return metas[i].getAttribute( "content" );
            }
        }
        return "";
    }
    getMetadataOG( property ) {
        var metas = document.getElementsByTagName( 'meta' );
        for ( var i = 0; i < metas.length; i++ ) {
            if ( metas[i].getAttribute( "property" ) === property ) {
                return metas[i].getAttribute( "content" );
            }
        }
        return "";
    }

    componentDidMount() {
        setInterval(() => {
            this.setState( {
                count: this.state.count + 1
            } );
        }, 1000 );
        chrome.tabs.query( { 'active': true, 'lastFocusedWindow': true }, function ( tabs ) {
            this.setState({url: tabs[0].url});
        } );
        const title = this.getMetadata( 'title' ) || this.getMetadataOG( 'og:title' ) || document.getElementsByTagName( 'title' );

        const keywords = this.getMetadata( 'news_keywords' ) || this.getMetadata( 'keywords' ) || this.getMetadataOG( 'keywords' );

        const description = this.getMetadata( 'description' );
        this.setState( { title } );
        this.setState( { keywords } );
        this.setState( { description } );
        document.addEventListener( 'click', () => {
            this.setState( {
                sidebarOpen: !sidebarOpen
            } )
        } )
    }

    render() {
        const { todos, actions } = this.props;
        const { filter } = this.state;

        const filteredTodos = todos.filter( TODO_FILTERS[filter] );
        const completedCount = todos.reduce(
            ( count, todo ) => ( todo.completed ? count + 1 : count ),
            0
        );

        return (
            <section className={ style.main }>
                <div style={ { zIndex: 9999, backgroundColor: 'white' } }>
                    <h3>{ this.state.message }</h3>
                    <h3>URL: { document.baseURI }</h3>
                    <h3>Title: { this.state.title }</h3>
                    <h3>Description: { this.state.description }</h3>
                    <h3>Keywords: { this.state.keywords }</h3>
                </div>
            </section>
        );
    }
}
