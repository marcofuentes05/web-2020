import React, {Fragment, useState} from 'react'
import {connect} from 'react-redux'
import * as actions from '../../actions/petOwners';
import './styles.css';
import * as selectors from '../../reducers';

const AddPetOwner = ({create, isAuth = false}) => {
    const [name,changeName] = useState('')
    if (isAuth){
        return(
        <Fragment>
            <input 
                type = "text" 
                placeholder = "El nombre aqui" 
                value = {name} 
                onChange = {e=>changeName(e.target.value)}
                id = "name"></input>
            <button
                type = "submit"
                onClick = {() => create(name)}>
                {'Enviar'}
            </button>
        </Fragment>
        )
    }
    else{
    return(<h1>{'Nada por aqui mano'}</h1>)
    }
}

export default connect(
    state => ({
        isAuth: selectors.isAuthenticated(state),
    }),
    dispatch => ({
        create(name){
            dispatch(actions.startAddingPetOwner(name))
        }
    })
)(AddPetOwner)
