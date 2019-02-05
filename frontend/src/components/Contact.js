import { withRouter } from 'react-router-dom';
import React from 'react';
import { inject, observer } from 'mobx-react';
import toastr from 'toastr';

@inject('contactStore')
@withRouter
@observer
export default class Contact extends React.Component {
  componentWillUnmount() {
    this.props.contactStore.reset();
  } 
  changeSubject = ev => this.props.contactStore.setSubject(ev.target.value);
  changeMessage = ev => this.props.contactStore.setMessage(ev.target.value);
  changeEmail = ev => this.props.contactStore.setEmail(ev.target.value);
  submitForm = () => ev => {
      ev.preventDefault();
      const errors=this.props.contactStore.frontendErrors;
      if(errors.email || errors.subject || errors.message){
        this.props.contactStore.setSubmittedAtLeastOnece();
        toastr.error('Something is wrong', 'Error');
      }else{
        this.props.contactStore.sendContact()
      .then(() => {
        const backendErrors = this.props.contactStore.backendErrors;
        const thereAreErrors = backendErrors.subject || backendErrors.message || backendErrors.email;
        if(!thereAreErrors){
          toastr.success('Your email has been sent!', 'Success');
          this.props.history.replace('/');
        }else{
          toastr.error('Something is wrong', 'Error');
        }
      });
      }
    }
  render() {
    const contactStore = this.props.contactStore;
    const frontendErrors = contactStore.frontendErrors;
    const thereAreFrontendErrors = frontendErrors.email || frontendErrors.subject || frontendErrors.message;
    return (
      <div className="auth-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Contact</h1>
              <br></br>
              <form onSubmit={this.submitForm(contactStore.values.subject, contactStore.values.email, contactStore.values.message)}>
                <fieldset>
                  <p hidden={!contactStore.values.submittedAtLeastOnce || !(contactStore.frontendErrors.subject || contactStore.backendErrors.subject)} ><font size="3" color="red">You have not introduced a subject!</font></p>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Subject"
                      value={contactStore.values.subject}
                      onChange={this.changeSubject} />
                  </fieldset>
                  <p hidden={!contactStore.values.submittedAtLeastOnce || !(contactStore.frontendErrors.email || contactStore.backendErrors.email)} ><font size="3" color="red">You have not introduced a valid email!</font></p>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="email"
                      placeholder="Email"
                      value={contactStore.values.email}
                      onChange={this.changeEmail}
                       />
                  </fieldset>
                  <p hidden={!contactStore.values.submittedAtLeastOnce || !(contactStore.frontendErrors.message || contactStore.backendErrors.message)} ><font size="3" color="red">Messages have to have at least 20 characters!</font></p>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      placeholder="Message"
                      value={contactStore.values.message}
                      onChange={this.changeMessage} />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    type="submit"
                    disabled={contactStore.inProgress || (thereAreFrontendErrors && contactStore.values.submittedAtLeastOnce)}>
                    Send!
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
Contact.propTypes = {
  errors: PropTypes.object,
  backendErrors: PropTypes.object,
  thereAreErrors:PropTypes.bool,
  contactStore:PropTypes.object,
  frontendErrors:PropTypes.object,
  thereAreFrontendErrors:PropTypes.bool
}