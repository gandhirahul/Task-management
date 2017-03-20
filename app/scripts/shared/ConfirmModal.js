/**
 * Confirms an action by showing a confirm modal
 * @Props
 * @param {requestCallback} handleHideModal - Cancels the confirm modal
 * @param {requestCallback} confirmCallback - Executes the action
 */
/** ConfirmModal@jsx React.DOM */

var $ = require("jquery");

var ConfirmModal = React.createClass({
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
                <h4 className="modal-title">Confirm</h4>
              </div>
              <div className="modal-body">
                This card will be permanently deleted. Are you sure ?
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-default" data-dismiss="modal">Cancel</button>
                <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={this.confirm}>Confirm</button>
              </div>
            </div>
          </div>
        </div>
      )
  },
  confirm : function() {
    /**
     * Confirm callback executed
     */
    this.props.confirmCallback();
  },
  
});
module.exports = ConfirmModal;
