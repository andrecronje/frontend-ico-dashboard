import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { closeVerifyChangePasswordPopup, verifyChangePassword } from '../../../redux/modules/account/changePassword';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class VerifyChangePassword extends Component {
  componentWillReceiveProps(nextProps) {
    const { open, oldPassword, newPassword, verificationId } = nextProps;
    if (open && oldPassword && newPassword && verificationId) {
      this.props.change('oldPassword', oldPassword);
      this.props.change('newPassword', newPassword);
      this.props.change('verification.verificationId', verificationId);
    }
  }

  render() {
    const {
      open,
      handleSubmit,
      closeVerifyChangePasswordPopup,
      spinner,
      invalid,
      error
    } = this.props;

    return (
      <Popup
        title="Verify change password"
        open={open}
        close={() => closeVerifyChangePasswordPopup()}>

        <div className={s.body}>
          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(verifyChangePassword)}>
            <FormSection name="verification">
              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="code"
                  placeholder="Verification code"
                  validate={required}/>
              </div>

              <div className={s.field}>
                <Field
                  component={RenderInput}
                  name="verificationId"
                  type="hidden"/>
              </div>
            </FormSection>

            <div className={s.field}>
              <Field
                component={RenderInput}
                name="oldPassword"
                type="hidden"/>
            </div>

            <div className={s.field}>
              <Field
                component={RenderInput}
                name="newPassword"
                type="hidden"/>
            </div>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
            </div>
          </form>
        </div>

      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'verifyChangePassword',
  initialValues: {
    oldPassword: '',
    newPassword: '',
    verification: {
      verificationId: '',
      code: ''
    }
  }
})(VerifyChangePassword);

export default connect(
  (state) => ({
    open: state.account.changePassword.verifyPopupOpen,
    oldPassword: state.account.changePassword.oldPassword,
    newPassword: state.account.changePassword.newPassword,
    verificationId: state.account.changePassword.verificationId,
    spinner: state.account.changePassword.spinner
  }),
  {
    closeVerifyChangePasswordPopup
  }
)(FormComponent);