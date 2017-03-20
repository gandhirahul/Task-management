/**
 * Renders the Cards.
 * @Props
 * @param {object[]} lists - state object of lists
 * @param {integer} listsID - ID of current list
 * @param {requestCallback} deleteCard - Delete card callback
 * @param {requestCallback} editCard - Edit card callback
 * @param {requestCallback} moveCard - MoveCard card callback
 */
/** Cards@jsx React.DOM */

var React = require('react');
var ConfirmModal = require("../shared/ConfirmModal");
var AddCardModal = require("../shared/AddCardModal");
var MoveCardModal = require("../shared/MoveCardModal");

var Cards = React.createClass({
	getInitialState: function() {
		return {
			card_id:null,
			cardData:null,
			view: {
				showConfirm: false,
				showEditCardModal: false,
				showMoveCardModal: false
			}
		};
	},
	render:function(){
		var props = this.props,
			data = props.data || [];

		return(
			<div className="cards" ref='cardref'>
				{
					data && data.map(function(elm,index){
						return  <div className="card" key={index}>
									<div className="desc">
										{elm.description}
									</div>	
									<div className="username">{elm.userName}</div>	
									<div className="status">{elm.status}</div>	
									<span className="dropdown">
									  <button className="btn btn-primary dropdown-toggle three-dots" type="button" data-toggle="dropdown">...
									  <span className="caret"></span></button>
									  <ul className="dropdown-menu">
									    <li onClick={this.showEditCard.bind(this,elm)} >
									    	<span >
												<span className="glyphicon glyphicon-pencil"  aria-hidden="true">Edit Card</span>
								    		</span>
							    		</li>
							    		<li onClick={this.moveCard.bind(this,elm)} >
									    	<span>
									    		<span className="glyphicon glyphicon-remove"  aria-hidden="true">Move Card</span>
											</span>
								    	</li>
									    <li onClick={this.showDelConfirm.bind(this,elm)} >
									    	<span>
									    		<span className="glyphicon glyphicon-remove"  aria-hidden="true">Delete</span>
											</span>
								    	</li>

									  </ul>
									</span>
								</div>
					}.bind(this))
				}
				{
					this.state.view.showConfirm && 
						<ConfirmModal handleHideModal={this.handleHideModal}
									  confirmCallback={this.deleteCard} />
				}
				{
					this.state.view.showEditCardModal && 
						<AddCardModal handleHideModal={this.handleHideModal}
									  addCard={this.editCard} 
								  	  cardData={this.state.cardData}  /> 
			  	}
				{
					this.state.view.showMoveCardModal && 
						<MoveCardModal handleHideModal={this.handleHideModal} 
									   cardData={this.state.cardData} 
									   lists={this.props.lists} 
									   listID={this.props.listID} 
									   moveCard={this.props.moveCard} /> 
				}

			</div>
		)
	},
	showDelConfirm: function(elm){
		/**
	     * Confirms deletion
	     * @Props
	     * @param {object[]} elm - Contains card object
	     */
		var state = {
			card_id:elm.card_id,
			cardData:null,
			view: {
					showConfirm: true,
					showEditCardModal: false,
					showMoveCardModal: false
				}
		}
		this.setState(state);
	},
	deleteCard: function() {
		/**
	     * Deletes the card
	     */
		this.handleHideModal();
		this.props.deleteCard(this.props.listID,this.state.card_id);
  	},
  	moveCard:function(elm){
  		/**
	     * Moves the card
	     * @Props
	     * @param {object[]} elm - Contains card object
	     */
  		var state = {
			card_id:elm.card_id,
			cardData:elm,
			view: {
					showConfirm: false,
					showEditCardModal: false,
					showMoveCardModal: true
				}
		}
		this.setState(state);
  	},
  	showEditCard:function(elm){
  		/**
	     * Shows edit card modal
	     * @Props
	     * @param {object[]} elm - Contains card object
	     */
  		var state = {
			cardData:elm,
			view: {
					showConfirm: false,
					showEditCardModal: true,
					showMoveCardModal: false
				}
		}
		this.setState(state);
  	},
  	editCard:function(cardData){
  		/**
	     * Edits the card
	     * @Props
	     * @param {object[]} cardData - Contains card object
	     */
  		this.props.editCard(this.props.listID,cardData);
  	},
  	handleHideModal:function(){
  		/**
	     * Hides the current Modal in view
	     */
  		var state = {
			card_id:null,
			cardData:null,
			view: {
					showConfirm: false,
					showEditCardModal: false,
					showMoveCardModal: false

				}
		}
		this.setState(state);
  	}

});
module.exports = Cards;
