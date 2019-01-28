import { observable, action } from 'mobx';
import agent from '../agent';


class ContactStore {
  /**
   * If a call to the server is in progress
   */
  @observable inProgress = false;
  /**
   * All the frontend errors, those are set to true because 
   * if are set to false you can press submit and actually go to the server
   * even if there are errors since it is checked here instead of in the component
   */
  @observable frontendErrors = {
    email:true,
    message:true,
    subject:true,
  }
  /**
   * All the backend errors
   */
  @observable backendErrors = {
    email:false,
    message:false,
    subject:false,
  }
  /**
   * The values of the form
   * submittedAtLeastOnce is if the submit button has been pressed at least once
   */
  @observable values = {
    submittedAtLeastOnce:false,
    message:'',
    email:'',
    subject:'',
  };
  /**Sets subject value, updates if there is a frontend error and resets 
   * subject backend error
   * @param subject is this.values.subject
   */
  @action setSubject(subject) {
    this.frontendErrors.subject = subject.length === 0;
    this.backendErrors.subject = false;
    this.values.subject = subject;
  }
  /**Sets message value, updates if there is a frontend error and resets 
   * message backend error
   * @param message is this.values.message
   */
  @action setMessage(message) {
    this.frontendErrors.message= message.length < 20;
    this.backendErrors.message= false;
    this.values.message = message;
  }
  /**Sets email value, updates if there is a frontend error and resets 
   * email backend error
   * @param email is this.values.email
   */
  @action setEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    this.frontendErrors.email = !re.test(String(email).toLowerCase()); 
    this.backendErrors.email = false; 
    this.values.email = email;
  }
  /**Resets the values of the contact */
  @action reset() {
    this.values.submittedAtLeastOnce=false;
    this.values.message = '';
    this.values.subject = '';
    this.values.email = '';
  }
  /**This is called instead of sendContact since there are
   * frontend errors and you just want to set to true that has been submitted
   * without going to the server side
   */
  @action setSubmittedAtLeastOnece(){
    this.values.submittedAtLeastOnce = true;
  }
  /**
   * functions that goes to the server and sends the email
   */
  @action sendContact() {
    this.values.submittedAtLeastOnce=true;
    this.inProgress = true;
    this.backendErrors = {
      email:false,
      message:false,
      subject:false,
    }
    return agent.Contact.sendContact(this.values.subject, this.values.email, this.values.message)
    .then(() => console.log("Success"))
    .catch(action((err) => {
      this.backendErrors.email = !(err.response.body.errors.email === undefined);
      this.backendErrors.subject = !(err.response.body.errors.subject === undefined);
      this.backendErrors.message = !(err.response.body.errors.message === undefined);
    }))
    .finally(action(() => {this.inProgress = false}));
  }
}

export default new ContactStore();