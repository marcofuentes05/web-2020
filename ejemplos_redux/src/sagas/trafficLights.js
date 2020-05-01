import {
  call,
  takeEvery,
  put,
  // race,
  // all,
  delay,
  select,
} from 'redux-saga/effects';

import * as selectors from '../reducers';
import * as actions from '../actions/petOwners';
import * as types from '../types/petOwners';


const API_BASE_URL = 'http://localhost:8000/api/v1';

function* addPetOwner (action) {
  try{ 
    const isAuth = yield select(selectors.isAuthenticated);
    if(isAuth){
        const token = yield select(selectors.getAuthToken)
        const response = yield call (
        fetch,
        `${API_BASE_URL}/owner/`,
        {
          method : 'POST',
          body: JSON.stringify(action.payload),
          headers: {
            'Content-Type': 'application/json',
            'Authorization' : `JWT ${token}`
          }
        }
        )
        console.log(action.payload)
        console.log(response)
        console.log(JSON.stringify(action.payload))
    }
  }catch(error){

  }
}

export function* watchAddPetOwner(){
  yield takeEvery(
    types.PET_OWNER_ADD_STARTED,
    addPetOwner,
  );
}
