/**
 * Renders the lists views.
 * @Props
 * @param {object[]} lists - Contains the information of lists
 * @param {object[]} cards - Contains the information of cards
 */
/** ListView@jsx React.DOM */

var React = require('react');
var Cards = require("./Cards");
var ConfirmModal = require("../shared/ConfirmModal");
var AddCardModal = require("../shared/AddCardModal");


var ListView = React.createClass({
	getDefaultProps: function() {
		return {
			lists: [],
      		cards: {}
		};
	},
	getInitialState: function() {
		return {
			editID:null,
			delID:null,
			addCardID:null,
			titleValue:'',
			view: {
				showConfirm: false,
				showAddCardModal: false
			}
		};
	},
	render:function(){
		
		var props = this.props,
			lists = props.lists || [],
			cards = props.cards || {};

		return(
			<div className="list-view row" ref='listView'>
				{
					lists.map(function(elm,index){
						var data = cards[elm.id];

						return <div className="list col-xs-12 col-sm-4" key={index}>
									<div className="list-sec">
										<div className="list-title">
											{
												this.state.editID === elm.id
												?
												<input  type="title"
														className="form-control edit-input" 
														onChange={this._handleChange}
														value={this.state.titleValue}
														id="title" 
														onKeyDown={this.handleKeyDown}  />
												:
												<div className="row">
													<div className="col-xs-10 elm-title">{elm.title}</div>
													<div className="col-xs-2 dropdown list-dropdown">
													  <button className="btn btn-primary dropdown-toggle three-dots" type="button" data-toggle="dropdown">...
													  <span className="caret"></span></button>
													  <ul className="dropdown-menu" >
													    <li className="li-options" onClick={this.editList.bind(this,elm)} >
													    	<span >
																<span className="glyphicon icons-list glyphicon-pencil"  aria-hidden="true"></span>
																Edit Title
												    		</span>
											    		</li>
											    		
											    		<li className="li-options" onClick={this.showAddCardModal.bind(this,elm)} >
													    	<span>
													    		<span className="glyphicon icons-list glyphicon-plus"  aria-hidden="true"></span>
													    		Add Card
															</span>
												    	</li>
													    <li className="li-options" onClick={this.showDelConfirm.bind(this,elm)} >
													    	<span>
													    		<span className="glyphicon icons-list glyphicon-remove"  aria-hidden="true"></span>
													    		Delete
															</span>
												    	</li>
													  </ul>
													</div>
												</div>
											}
										</div>
										<Cards  data={data}
												lists={lists} 
												listID={elm.id} 
												deleteCard={this.props.deleteCard} 
												editCard={this.props.editCard} 
												moveCard={this.props.moveCard} />
									</div>
								</div>
					}.bind(this))
				}
				{
					this.state.view.showConfirm && 
						<ConfirmModal 	handleHideModal={this.handleHideModal} 
										confirmCallback={this.deleteList} /> 
				}
				{
					this.state.view.showAddCardModal &&
						 <AddCardModal  handleHideModal={this.handleHideModal} 
						 				addCard={this.addCard}  />
	 			}
			</div>
		)
	},
	_handleChange : function(event) {
		/**
	     * Binds the input box value
	     * @Props
	     * @param {object[]} event - Event object
	     */
		this.setState({
			titleValue: event.target.value
		});
  	},
	editList:function(elm){
		/**
	     * Edits the title of list
	     * @Props
	     * @param {object[]} elm - Contains the information of list to be edited
	     */
		this.setState({
			editID:elm.id,
			titleValue:elm.title
		});
	},
	showDelConfirm:function(elm){
		/**
	     * Confirm box for delete
	     * @Props
	     * @param {object[]} elm - list object
	     */
		var state = {
			delID:elm.id,
			view: {
					showConfirm: true,
					showAddCardModal: false
				}
		}
		this.setState(state);
	},
	deleteList:function(){
		/**
	     * Delets the list
	     */
		this.props.deleteList(this.state.delID);
		this.handleHideModal();
	},
	showAddCardModal:function(elm){
		/**
	     * To show the Modal Popup for adding the card
	     * @Props
	     * @param {object[]} elm - contains card object
	     */
		var state = {
			addCardID:elm.id,
			view: {
					showConfirm: false,
					showAddCardModal: true
				}
		}
		this.setState(state);
	},
	addCard:function(card){
		/**
	     * Adds the cards
	     * @Props
	     * @param {object[]} card - Contains card object
	     */
		this.props.addCard(this.state.addCardID,card);
		this.handleHideModal();
	},
	handleHideModal: function() {
		/**
	     * Hides the Modal
	     */
		var state = {
			delID:null,
			addCardID:null,
			view: {
					showConfirm: false,
					showAddCardModal: false
				}
		}
		this.setState(state);
  	},
	
  	handleKeyDown : function(event){
  		/**
	     * Handles Key Event - Enter & esc
	     * @Props
	     * @param {object[]} event - Event Object
	     */
	  if(event.keyCode === 13){
	  	var elm = {
	  		'title':this.state.titleValue,
	  		'id':this.state.editID
	  	};
	    this.props.editList(elm);
	    this.setState({editID:null});
	  }
	  if (event.keyCode === 27){
	  	this.setState({editID:null});
	  }
	}

});
module.exports = ListView;