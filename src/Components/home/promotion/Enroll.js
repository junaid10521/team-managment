import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

import {validate} from '../../ui/misc';

import FormField from '../../ui/formFields';

import {firebasePromotions} from '../../../firebaseConnection';

class Enroll extends Component {

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
            }
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

    resetFormSuccess(boolean){
        const newFormData = {...this.state.formData};

        for(let key in newFormData){
            newFormData[key].value = '';
            newFormData[key].valid = false;
            newFormData[key].validationMessage = '';
        }

        this.setState({
            fromError: false,
            formData: newFormData,
            formSuccess: boolean ? 'Congratulations' : 'Already in the database'
        });

        this.clearSuccessMessage();
    }

    clearSuccessMessage = () => {
        setTimeout(() => {
            this.setState({
                formSuccess: ''
            })
        }, 2000)
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

            firebasePromotions.orderByChild('email').equalTo(dataToSubmit.email).once('value')
            .then((response) => {
                if (response.val() === null) {
                    firebasePromotions.push(dataToSubmit);
                    this.resetFormSuccess(true);
                }else{
                    this.resetFormSuccess(false);
                }
            })
         
        } else{
            this.setState({
                fromError: true
            })
        }
    }

    render() {
        return (
            <Fade>
                <div className='enroll_wrapper'>
                    <form onSubmit={(event) => this.submitForm()}>
                        <div className='enroll_title'>
                            Enter your Email
                        </div>
                        <div className='enroll_input'>
                            <FormField 
                            id={'email'}
                            formData={this.state.formData.email}
                            change={(element) => this.updateForm(element)} />

                            {this.state.fromError ? <div className='error_label'>Something is wrong, Try again</div> : null}

                            <div className='success_label'>{this.state.formSuccess}</div>
                            <button onClick={(event) => this.submitForm(event)}>Enroll</button>
                        </div>
                    </form>
                </div>
            </Fade>
        );
    }
}

export default Enroll;