import { fork, all } from 'redux-saga/effects';

import { watchLoginStarted } from './auth';
import { watchSayHappyBirthday } from './happyBirthday';
import { watchAddPetOwner } from './trafficLights'
import { watchFetchPetOwners } from './fetchPetOwners'
import { watchDeletePetOwner } from './deletePetOwner';

function* mainSaga() {
  yield all([
    fork(watchLoginStarted),
    fork(watchSayHappyBirthday),
    fork(watchAddPetOwner),
    fork(watchFetchPetOwners),
    fork(watchDeletePetOwner)
  ]);
}


export default mainSaga;
