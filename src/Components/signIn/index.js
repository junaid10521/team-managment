import React, { Component } from 'react';
import {firebase} from '../../firebaseConnection';

import {validate} from '../ui/misc';

import FormField from '../ui/formFields';

class SignIn extends Component {

    state = {
        fromError: false,
        formSuccess: '',
        formData: {
            email: {
                element: 'input',
                value: '',
                config: {
                    name: 'email_input',
                    type: 'email',
                    placeholder: 'Enter Your Email'
                },
                validation: {
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage: ''
            },
            password: {
                element: 'input',
                value: '',
                config: {
                    name: 'password_input',
                    type: 'password',
                    placeholder: 'Enter Your Password'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: ''
            }
        }
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            formIsValid = this.state.formData[key].valid && formIsValid;
        }

        if (formIsValid) {
            firebase.auth().signInWithEmailAndPassword(dataToSubmit.email, dataToSubmit.password)
            .then(() => {
                this.props.history.push('/dashboard')
            }).catch(error => {
                this.setState({
                    fromError: true
                })
            })
        } else{
            this.setState({
                fromError: true
            })
        }
    }

    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};

        let validateData = validate(newElement);

        newElement.valid = validateData[0];
        newElement.validationMessage = validateData[1];

        newElement.value = element.event.target.value;
        newFormData[element.id] = newElement;

        this.setState({
            fromError: false,
            formData: newFormData
        })
    }

    render() {
        return (
            <div className='container'>
                <div className='signin_wrapper' style={{margin: '100px'}}>
                    <form onSubmit={(event) => this.submitForm(event)}>
                        <h2>Please Login</h2>

                        <FormField 
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(element) => this.updateForm(element)} />

                        <FormField 
                            id={'password'}
                            formData={this.state.formData.password}
                            change={(element) => this.updateForm(element)} />

                        {this.state.fromError ? <div className='error_label'>Something is wrong, Try again</div> : null}
                    </form>
                    <button onClick={(event) => this.submitForm(event)}>Sign In</button>
                </div>
            </div>
        );
    }
}

export default SignIn;