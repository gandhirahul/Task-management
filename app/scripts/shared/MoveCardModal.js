/**
 * Renders the Move Card to list view.
 * @Props
 * @param {requestCallback} handleHideModal - Hides modal callback
 *  @param {object[]} cardData - state object of card to be edited
 *  @param {object[]} lists - state object of lists to be rendered
 *  @param {object[]} listID - ID of list which contains the card
 * @param {requestCallback} moveCard - move card callback
 */
/** MoveCardModal@jsx React.DOM */

var $ = require("jquery");
var classNames = require('classnames');

var MoveCardModal = React.createClass({
  getDefaultProps: function() {
    return {
      title:'Select the list to move card'
    };
  },
  getInitialState: function() {
    return {
      moveTo:0
    };
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
                <h4 className="modal-title">{this.props.title}</h4>
              </div>
              <div className="modal-body">
                  {
                    this.props.lists.map(function(elm,index){
                      return <div key={index} className={classNames('radio', {"disabled": this.props.listID === elm.id})}>
                                <label>
                                  <input  type="radio" 
                                          name="listradio"
                                          value={elm.id}
                                          checked={this.state.moveTo == elm.id}
                                          onChange={this._handleChange}
                                          disabled= {this.props.listID === elm.id ? true : false}  />
                                    {elm.title}
                                </label>
                            </div>
                    }.bind(this))
                  }
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this.moveCard}>Move</button>
              </div>
            </div>
          </div>
        </div>
      )
  },
  _handleChange : function(event) {
      /**
       * Binding the value of textbox
       */
      this.setState({
        moveTo: event.target.value
      });
  },
  moveCard : function() {
    /**
     * Move Card action
     */
    if(this.state.moveTo > -1 && this.state.moveTo != this.props.listID){
      this.props.moveCard(this.props.cardData.card_id,this.props.listID,this.state.moveTo);
      $(this.refs.modal).modal('hide');
      this.props.handleHideModal();
    }
  }
  
});
module.exports = MoveCardModal;