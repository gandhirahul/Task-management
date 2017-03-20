/**
 * Adds or Edits a card
 * @Props
 * @param {object[]} cardData - state object of card to be edited
 * @param {requestCallback} handleHideModal - Hides modal callback
 * @param {requestCallback} addCard - Add card/ edit card callback
 */
/** Cards@jsx React.DOM */

var $ = require("jquery");

var AddCardModal = React.createClass({

  getInitialState: function() {
    var state = {
          desc:'',
          user:'',
          status:'',
          card_id:''
    }
    
    if(this.props.cardData){
      state.desc = this.props.cardData.description;
      state.user = this.props.cardData.userName;
      state.status = this.props.cardData.status;
      state.card_id = this.props.cardData.card_id;
    }
    
    return state;
  },
  componentDidMount: function() {
    
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);      

  },
  render: function() {

  	return (
        <div className="modal fade" ref="modal">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                <h4 className="modal-title">Add Card to the list</h4>
              </div>
              <div className="modal-body">
                <div className="form-horizontal">
                    <div className="form-group">
                      <label className="control-label col-sm-3" htmlFor="desc">Description</label>
                      <div className="col-sm-9">
                        <input type="text" autoFocus={true} ref="inputBox" className="form-control" onChange={this._handleChange} value={this.state.desc} id="desc" onKeyDown={this.handleKeyDown} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-sm-3" htmlFor="user">User to Tag</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" onChange={this._handleChange} value={this.state.user} id="user" onKeyDown={this.handleKeyDown} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label className="control-label col-sm-3" htmlFor="status">Enter the status:</label>
                      <div className="col-sm-9">
                        <input type="text" className="form-control" onChange={this._handleChange} value={this.state.status} id="status" onKeyDown={this.handleKeyDown} />
                      </div>
                    </div>
                </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.addCard}>Add</button>
              </div>
            </div>
          </div>
        </div>
      )
  },
  _handleChange : function(event) {
    /**
     * Binds the input box value
     * @Props
     * @param {object[]} event - Event object
     */
    var id = event.target.id;
    var value = event.target.value;
    var state = {};
    state[id] = value;

    this.setState(state);
  },
  addCard:function(){
    /**
     * Executes the addCard callback
     */
    this.props.addCard(this.state);
  },
  handleKeyDown : function(event){
    /**
     * Handles Key Event - Enter & esc
     * @Props
     * @param {object[]} event - Event Object
     */
    if(event.keyCode === 13){

      this.props.addCard(this.state);
      this.props.handleHideModal();
      $(this.refs.modal).modal('hide');
      
    }
    if (event.keyCode === 27){
      this.props.handleHideModal();
      $(this.refs.modal).modal('hide');
    }
  }

  
});
module.exports = AddCardModal;