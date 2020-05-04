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

function* FetchPetOwners(action) {
    try {
        const isAuth = yield select(selectors.isAuthenticated);
        if (isAuth) {
            const token = yield select(selectors.getAuthToken)
            const response = yield call (fetch , `${API_BASE_URL}/owner`, {headers: {'Authorization': `JWT ${token}`}})
            if (response.status === 200) {
                const owners = yield response.json()
                const entities = {};
                const order = [];
                console.log(owners)
                owners.map(owner => {
                    entities = {
                        ...entities,
                        [owner.id]: owner
                    },
                    order = [
                        ...order,
                        owner.id
                    ]
                });
                yield put(actions.completeFetchingPetOwners(entities, order));
            }else{
                const {error} = yield response.json()
                yield put(actions.failFetchingPetOwners(error)) 
            }
        }
    } catch (error) {
        console.log('Murio', error) 
        yield put(actions.failFetchingPetOwners('Todo fallo :('))        
    }
}

export function* watchFetchPetOwners() {
    yield takeEvery(
        types.PET_OWNERS_FETCH_STARTED,
        FetchPetOwners,
    );
}
