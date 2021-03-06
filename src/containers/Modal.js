import { connect } from "react-redux";
import { reduxForm } from "redux-form";
import Modal from "../components/pages/Modal";
import { actions, interactions } from "../actions/modal";

const mapStateToProps = state => ({
  ...state.modal,
  type: state.modal.modalType,
});

const interactionDispatchMap = {
  [interactions.CANCEL]: () => actions.close(),
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  interactionHandler: (event, interaction) => {
    // Hint: Submit is handled by the form, not as action. But we need to
    // prevent form submitting for the other actions.
    const action = interactionDispatchMap[interaction];
    if (action) {
      event.preventDefault();
      dispatch(action());
    }
  },
  onAfterOpen: () => {
    ownProps.reset();
  },
});

const onSubmit = (values, dispatch) => {
  dispatch(actions.confirmed(values.password));
};

const ModalRedux = connect(mapStateToProps, mapDispatchToProps)(Modal);

const ModalForm = reduxForm({
  form: "modal",
  onSubmit,
})(ModalRedux);

export default ModalForm;
