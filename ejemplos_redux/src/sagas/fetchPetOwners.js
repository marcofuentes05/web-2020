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

function* FetchPetOwners(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken)
            const response = yield call(
                fetch,
                `${API_BASE_URL}/owner`,
                {
                    method: 'GET',
                    // body: JSON.stringify(action.payload),
                    headers: {
                        //'Content-Type': 'application/json',
                        'Authorization': `JWT ${token}`
                    }
                }
            )
            console.log(response)
        }
    } catch (error) {
        console.log('Murio', error)
    }
}

export function* watchFetchPetOwners() {
    yield takeEvery(
        types.PET_OWNERS_FETCH_STARTED,
        FetchPetOwners,
    );
}
