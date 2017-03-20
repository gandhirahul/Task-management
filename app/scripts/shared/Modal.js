/**
 * Renders the Modal to add new list
 * @Props
 * @param {requestCallback} handleHideModal - Hide modal callback
 * @param {requestCallback} createList - create new List callback
 */
/** Cards@jsx React.DOM */
var $ = require("jquery");

var Modal = React.createClass({
  getDefaultProps: function() {
    return {
      title:'Hello there!'
    };
  },
  getInitialState: function() {
    return {
      titleValue:''
    };
  },
  componentDidMount: function() {
     
      $(this.refs.modal).modal('show');
      $(this.refs.modal).on('hidden.bs.modal', this.props.handleHideModal);
      this.refs.inputElm.focus();

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
                 <div className="form-group">
                    <label htmlFor="title">Enter the title:</label>
                    <input type="title" ref="inputElm" className="form-control" onChange={this._handleChange} value={this.state.titleValue} id="title" onKeyDown={this.handleKeyDown} />
                  </div>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
                <button type="button" className="btn btn-primary" onClick={this._saveTitle}>Save changes</button>
              </div>
            </div>
          </div>
        </div>
      )
  },
  _handleChange : function(event) {
      /**
       * Binding the value of textbox
       * @Props
       * @param {object} event - event object
       */
      this.setState({
        titleValue: event.target.value
      });
  },
  _saveTitle : function() {
    /**
     * Saves the title and closes the modal
     */
    if(this.state.titleValue){
      $(this.refs.modal).modal('hide');
      this.props.createList(this.state.titleValue);
    }
  },
  
  handleKeyDown : function(event){
    /**
     * Handles Key Event - Enter & esc
     * @Props
     * @param {object[]} event - Event Object
     */
    if(event.keyCode === 13){

      $(this.refs.modal).modal('hide');
      this.props.createList(this.state.titleValue);
      this.props.handleHideModal();
      
    }
    if (event.keyCode === 27){
     
      $(this.refs.modal).modal('hide');
      this.props.handleHideModal();

    }
  }
 });
module.exports = Modal;