import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';
import { watchAddPetOwner } from './trafficLights'
import { watchFetchPetOwners } from './fetchPetOwners'

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSayHappyBirthday),
    fork(watchAddPetOwner),
    fork(watchFetchPetOwners),
  ]);
}


export default mainSaga;
