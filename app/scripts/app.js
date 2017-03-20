/**
 * Starts the app - Renders the TaskManagement Component.
 */
/** app@jsx React.DOM */

var React = window.React = require('react'),
    ReactDOM = require("react-dom"),
    ListView = require("./components/ListView"),
    Modal = require("./shared/Modal"),
    mountNode = document.getElementById("app");

var TaskManagement = React.createClass({
 
  getInitialState: function() {
    
    var state = {
      lists: [],
      cards: {}
    };

    var savedState = this._getCookie(); // Fetching data from cookie.
    if(savedState){ 
      state = JSON.parse(savedState);
    }

    return {
      lists: state.lists,
      cards: state.cards,
      view: {showModal: false}
    };
  },
 
  render: function() {
    return (
      <div>
        <h3>Add your Task here!</h3>

        <ListView lists={this.state.lists}
                  cards={this.state.cards}
                  editList={this.editList} 
                  deleteList={this.deleteList} 
                  addCard={this.addCard} 
                  editCard={this.editCard} 
                  deleteCard={this.deleteCard} 
                  moveCard={this.moveCard} />

        <button className="create-card" onClick={this.handleShowModal}>
          <span className="glyphicon glyphicon-plus" aria-hidden="true"></span>
        </button>

        {
          this.state.view.showModal && 
            <Modal  handleHideModal={this.handleHideModal}
                    createList={this.createList}
                    title="Create new list" /> 
        }
       
      </div>
    )
  },
  createList:function(title){
    /**
     * Create a new list
     * @Props
     * @param {string} title - Title of new list 
     */
    var newList = {'title':title,id: this.state.lists.length };
    var lists = this.state.lists.concat(newList);
    this.updateList(lists);   
  },
  editList:function(list){
    /**
     * Edits the list
     * @Props
     * @param {object[]} list - Contains the information of list to be edited
     */
    var newState = this.state.lists.map(function(elm,index){
      if(elm.id === list.id){
        elm.title = list.title
      }
      return elm;
    });
    this.updateList(newState);

  },
  deleteList: function(id){
    /**
     * Deletes a list & its' corresponding cards
     * @Props
     * @param {integer} title - id of list to be deleted
     */
    var newListState = this.state.lists.filter(function(elm,index){
      if(elm.id !== id){
        return elm;  
      }
    });

    var newCardState = this.state.cards 
    delete newCardState[id];

    this.updateList(newListState);
    this.updateCards(newCardState);
  },
  updateList:function(lists){
    /**
     * Updates the list state & saves to cookie.
     * @Props
     * @param {object} lists - new state of lists
     */
    this.setState({
      lists:lists
      },function(){
        this._setCookie(); // Saving to cookie only when the state has been udpated.
    });
  },
  addCard:function(id,cardData){
    /**
     * Adds a new card
     * @Props
     * @param {integer} id - id of lists where to add card 
     * @param {object} cardData - data of new card
     */
    if(!this.state.cards[id]){
      this.state.cards[id] = [];
    }

    var card_id = id + '' + this.state.cards[id].length;
    var card = {
      'description': cardData.desc,
      'userName': cardData.user,
      'status': cardData.status,
      'card_id': card_id
    };

    var cards = this.state.cards;
    cards[id].push(card);
    this.updateCards(cards);
  },
  deleteCard:function(id,card_id){
    /**
     * Deletes a card.
     * @Props
     * @param {integer} id - id of list whose card is to be deleted
     * @param {integer} card_id - id of card to be deleted
     */
    var card = this.state.cards[id].filter(function(elm,index){
      if(elm.card_id !== card_id){
        return elm;  
      }
    });

    var newState = this.state.cards;
    newState[id] = card;

    this.updateCards(newState);
  },
  editCard:function(id,cardData){
    /**
     * Edits the cards
     * @Props
     * @param {integer} id - id of list whose card is to be edited
     * @param {object[]} cardData - Contains the information of list to be edited
     */
    
    if(!this.state.cards[id]){
      this.state.cards[id] = [];
    }

    var card = this.state.cards[id].map(function(elm,index){
      if(elm.card_id === cardData.card_id){
        
        elm.description= cardData.desc;
        elm.userName= cardData.user;
        elm.status= cardData.status;
        elm.card_id= cardData.card_id;

      }
      return elm;
    });

    var cards = this.state.cards;
    cards[id] = card;
    this.updateCards(cards);
  },
  moveCard:function(card_id,from_id,to_id){
    /**
     * Moves the card
     * @Props
     * @param {integer} card_id - id of  card to be moved
     * @param {integer} from_id - id of list from where card is to be moved
     * @param {integer} to_id -  id of list to which card is to be moved
     */
    var cards = this.state.cards; 
    var card_to_move = {};
    var from_card = cards[from_id].filter(function(elm,index){
        if(elm.card_id === card_id){
          card_to_move = elm;
      }
      return elm.card_id !== card_id;
    });

    cards[from_id] = from_card;

    if(!this.state.cards[to_id]){
      this.state.cards[to_id] = [];
    }

    var to_cards =  this.state.cards[to_id].concat(card_to_move);
    cards[to_id] = to_cards;

    this.updateCards(cards);

  },
  updateCards:function(cards){
    /**
     * Updates the card state & saves to cookie.
     * @Props
     * @param {object} cards - new state of cards
     */
    this.setState({
      cards:cards
    },function(){
      // Saving to cookie only when the state has been udpated.
      this._setCookie();
    });
  },
  handleHideModal: function() {
    /**
     * Hides the modal
     */
    this.setState({view: {showModal: false}});

  },
  handleShowModal: function() {
    /**
     * Shows the Modal
     */
    this.setState({view: {showModal: true}});

  },
  _setCookie:function(){
    /**
     * Saves the state to cookie
     */
    document.cookie = 'state=' + JSON.stringify(this.state);
  },
  _getCookie:function(){
    /**
     * Fetches the state from cookie
     */
    var state = "state=";
    var cookie_array = document.cookie.split(';');

    for(var i=0;i < cookie_array.length;i++) {
      var c = cookie_array[i];
      
      while (c.charAt(0)==' '){
         c = c.substring(1,c.length);
      }

      if (c.indexOf(state) == 0){
       return c.substring(state.length,c.length);
      }

    }

    return null;
  }

});

ReactDOM.render(<TaskManagement />, mountNode);