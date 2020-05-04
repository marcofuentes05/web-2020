import React, {Fragment} from 'react';
import {connect} from 'react-redux'

// import './styles.css'

import * as selectors from '../../reducers';



function ShowPetOwners({petOwners}){
    if (petOwners) {
        return (
            <Fragment>
                {
                    petOwners.map(
                        value => <h3 key = {value.id}>
                            {value.name}
                        </h3>
                    )
                }
            </Fragment>
        )
    }else{
        return(['Nada por aqui', 'tampo co'].map((value,id) => <h3 key = {id}>{value}</h3>))
    }
}

export default connect(
    state => ({
        petOwners :selectors.getPetOwners(state),
    }),
    dispatch => ({})
)(ShowPetOwners)