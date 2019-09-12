import React, { Component } from 'react';

import AdminLayout from '../../../Hoc/AdminLayout';
import FormField from '../../ui/formFields';
import { validate } from '../../ui/misc';
import {firebaseTeams, firebaseMatches, firebaseDB} from '../../../firebaseConnection';
import {firebaseLooper} from '../../ui/misc';

class AddEditMatch extends Component {

    state = {
        matchId: '',
        formType: '',
        formError: false,
        formSuccess: '',
        teams: [],
        formData: {
            date: {
                element: 'input',
                value: '',
                config: {
                    label: 'Event Date',
                    name: 'date_input',
                    type: 'date'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            local: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Local team',
                    name: 'input_select',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultLocal: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Local',
                    name: 'result_local_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            away: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Away team',
                    name: 'input_select',
                    type: 'select',
                    options: []
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            resultAway: {
                element: 'input',
                value: '',
                config: {
                    label: 'Result Away',
                    name: 'result_away_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: false
            },
            referee: {
                element: 'input',
                value: '',
                config: {
                    label: 'Referee',
                    name: 'referee_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            stadium: {
                element: 'input',
                value: '',
                config: {
                    label: 'Stadium',
                    name: 'stadium_input',
                    type: 'text'
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            result: {
                element: 'select',
                value: '',
                config: {
                    label: 'Select Result',
                    name: 'result_select',
                    type: 'select',
                    options: [
                        {key: 'W', value: 'W'},
                        {key: 'L', value: 'L'},
                        {key: 'D', value: 'D'},
                        {key: 'n/a', value: 'n/a'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
            final: {
                element: 'select',
                value: '',
                config: {
                    label: 'Game Played?',
                    name: 'final_result',
                    type: 'select',
                    options: [
                        {key: 'Yes', value: 'Yes'},
                        {key: 'No', value: 'No'}
                    ]
                },
                validation: {
                    required: true
                },
                valid: false,
                validationMessage: '',
                showLabel: true
            },
        }
    }

    updateFields = (matchId, type, teams, teamOptions, match) => {
        const newFormdata = {
            ...this.state.formData
        }

        for(let key in newFormdata){
            if (match) {
                newFormdata[key].value = match[key];
                newFormdata[key].valid = true;
            }
            if(key === 'local' || key === 'away'){
                newFormdata[key].config.options = teamOptions;
            }

            this.setState({
                matchId,
                formType: type,
                formData: newFormdata,
                teams
            });
        }
    }

    componentDidMount(){
        const matchId = this.props.match.params.id;

        const getTeams = (match, type) => {
            firebaseTeams.once('value').then((response) => {
                const teams = firebaseLooper(response);
                const teamOptions = [];

                response.forEach((childResponse) => {
                    teamOptions.push({
                        key: childResponse.val().shortName,
                        value: childResponse.val().shortName
                    })
                });

                this.updateFields(matchId, type, teams, teamOptions, match);
            })
        }

        if (!matchId) {
            getTeams(false, 'Add Match');
        } else{
            firebaseDB.ref(`matches/${matchId}`).once('value')
            .then((response) => {
                const match = response.val();
                getTeams(match, 'Edit Match');
            })
        }
    }

    updateForm(element){
        const newFormData = {...this.state.formData};
        const newElement = {...newFormData[element.id]};

        // let validateData = validate(newElement);

        // newElement.valid = validateData[0];
        // newElement.validationMessage = validateData[1];

        newElement.value = element.event.target.value;
        newFormData[element.id] = newElement;

        this.setState({
            fromError: false,
            formData: newFormData
        })
    }

    successForm(message){
        this.setState({
            formSuccess: message
        });

        setTimeout(() => {
            this.setState({
                formSuccess: ''
            });
        }, 2000);
    }

    submitForm(event){
        event.preventDefault();

        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formData){
            dataToSubmit[key] = this.state.formData[key].value;
            // formIsValid = this.state.formData[key].valid && formIsValid;
        }

        this.state.teams.forEach((team) => {
            if(team.shortName === dataToSubmit.local){
                dataToSubmit['localThmb'] = team.thmb;
            }

            if(team.shortName === dataToSubmit.away){
                dataToSubmit['awayThmb'] = team.thmb;
            }
        })

        if (formIsValid) {
            if(this.state.formType === 'Edit Match'){

                firebaseDB.ref(`matches/${this.state.matchId}`)
                .update(dataToSubmit).then((response) => {
                    this.successForm('Form updated successfully');
                }).catch((error) => {
                    this.setState({
                        fromError: true
                    })
                })

            } else {
               
                firebaseMatches.push(dataToSubmit).then(() => {
                    this.props.history.push('/admin_matches');
                }).catch((error) => {
                    this.setState({
                        fromError: true
                    })
                })

            }
        } else{

            this.setState({
                fromError: true
            })

        }
    }

    render() {
        return (
            <AdminLayout>
               <div className='editmatch_dialog_wrapper'>
                   <h2>
                       {this.state.formType}
                   </h2>

                   <div>
                       <form onSubmit={(event) => this.submitForm(event)}>

                            <FormField 
                                id={'date'}
                                formData={this.state.formData.date}
                                change={(element) => this.updateForm(element)} />

                            <div className='select_team_layout'>
                                <div className='label_inputs'>Local</div>

                                <div className='wrapper'>
                                    <div className='left'>
                                        <FormField 
                                        id={'local'}
                                        formData={this.state.formData.local}
                                        change={(element) => this.updateForm(element)} />
                                    </div>
                                    <div>
                                        <FormField 
                                        id={'resultLocal'}
                                        formData={this.state.formData.resultLocal}
                                        change={(element) => this.updateForm(element)} />
                                    </div>
                                </div>
                            </div>

                            <div className='select_team_layout'>
                                <div className='label_inputs'>Away</div>

                                <div className='wrapper'>
                                    <div className='left'>
                                        <FormField 
                                        id={'away'}
                                        formData={this.state.formData.away}
                                        change={(element) => this.updateForm(element)} />
                                    </div>
                                    <div>
                                        <FormField 
                                        id={'resultAway'}
                                        formData={this.state.formData.resultAway}
                                        change={(element) => this.updateForm(element)} />
                                    </div>
                                </div>
                            </div>

                            <div className='split_fields'>
                                <FormField 
                                    id={'referee'}
                                    formData={this.state.formData.referee}
                                    change={(element) => this.updateForm(element)} />

                                <FormField 
                                    id={'stadium'}
                                    formData={this.state.formData.stadium}
                                    change={(element) => this.updateForm(element)} />
                            </div>

                            <div className='split_fields last'>
                                <FormField 
                                    id={'result'}
                                    formData={this.state.formData.result}
                                    change={(element) => this.updateForm(element)} />

                                <FormField 
                                    id={'final'}
                                    formData={this.state.formData.final}
                                    change={(element) => this.updateForm(element)} />
                            </div>

                            <div className='success_label'>{this.state.formSuccess}</div>
                            {
                                this.state.formError ?
                                <div className='error_label'>Something went wrong.</div>
                                : ''
                            }

                            <div className='admin_submit'>
                                <button onClick={(event) => this.submitForm(event)}>
                                    {this.state.formType}
                                </button>
                            </div>

                       </form>
                   </div>
               </div>
            </AdminLayout>
        );
    }
}

export default AddEditMatch;