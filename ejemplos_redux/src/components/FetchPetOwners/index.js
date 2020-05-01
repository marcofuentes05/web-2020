import React, { Fragment, useState } from 'react'
import { connect } from 'react-redux'
import * as actions from '../../actions/petOwners';
import './styles.css';
import * as selectors from '../../reducers';

const FetchPetOwners = ({isAuth, fetchPet}) =>{
    if (isAuth){
        return(
            <button
            className = "boton"
            onClick = {() => fetchPet()}
            >
                {'Ver todos los pet owners'}
            </button>

        )
    }else{
        return(
        <h1>{'Nada por aqui tampoco mano'}</h1>
        )
    }
}

export default connect(
    state => ({
        isAuth : selectors.isAuthenticated(state),
    }),
    dispatch => ({
        fetchPet(){
            dispatch(actions.startFetchingPetOwners())
        }
    })
)(FetchPetOwners)