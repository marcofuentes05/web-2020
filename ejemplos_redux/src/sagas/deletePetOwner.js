import {
    call,
    takeEvery,
    put,
    // race,
    // all,
    // delay,
    select,
} from 'redux-saga/effects';


import * as selectors from '../reducers';
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';

const API_BASE_URL = 'http://localhost:8000/api/v1';

function* deletePetOwner(action) {
    try{
        const isAuth = yield select(selectors.isAuthenticated);
        if(isAuth){
            const token = yield select(selectors.getAuthToken)
            const id = action.payload.id
            const response = yield call (
                fetch,
                `${API_BASE_URL}/owner/${id}/remove/`,
                {
                    method: 'POST',
                    body : JSON.stringify(action.payload),
                    headers: {
                        'Content-Type': 'application/json',
                        'Authentication':`JWT ${token}`
                    },
                },
            );
            if (response.status === 200){
                yield put(actions.completeRemovingPetOwner())
            }else{
                const {non_field_errors} = yield response.json()
                yield put(actions.failRemovingPetOwner(non_field_errors[0]))
            }
        }
    }catch(error){
        yield put(actions.failRemovingPetOwner('Fallo horrible la conexion mano'))
    }
}

export function* watchDeletePetOwner(){
    yield takeEvery (
        types.PET_OWNER_REMOVE_STARTED,
        deletePetOwner
    )
}