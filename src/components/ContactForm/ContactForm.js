import { Component } from "react";
import { v4 as uuid } from "uuid";
import s from "./ContactForm.module.css";

const INITIAL_STATE = {
  name: "",
  number: "",
};

class ContactForm extends Component {
  state = INITIAL_STATE;

  handleChangeForm = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  handleFormSubmit = (event) => {
    event.preventDefault();

    const { name, number } = this.state;
    const { onAdd } = this.props;

    const isValidatedForm = this.validatedForm();
    if (!isValidatedForm) return;

    onAdd({ id: uuid(), name, number });
    this.resetForm();
  };
  validatedForm = () => {
    const { name, number } = this.state;
    const { onCheckUnique } = this.props;
    if (!name || !number) {
      alert("Some filed is empty");
      return false;
    }
    return onCheckUnique(name);
  };

  resetForm = () => this.setState(INITIAL_STATE);

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleFormSubmit}>
        <div className={s.inputForm}>
          <h3 className={s.dataInput}>Name</h3>
          <input
            type="text"
            name="name"
            placeholder="Enter name"
            value={name}
            onChange={this.handleChangeForm}
          />
          <h3 className={s.dataInput}>Number</h3>
          <input
            type="tel"
            name="number"
            placeholder="Enter phone number"
            value={number}
            onChange={this.handleChangeForm}
          />
          <div>
            <button className={s.addContact} type="submit">
              Add contact
            </button>
          </div>
        </div>
      </form>
    );
  }
}

export default ContactForm;
