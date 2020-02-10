import { Alert } from 'react-native';

import { all, takeLatest, put, call } from 'redux-saga/effects';

import api from '~/services/api';

import { updateProfileSuccess, updateProfileFailure } from './actions';

export function* updateProfile({ payload }) {
    try {
        const { name, email, avatar_id, ...rest } = payload.data;

        const profile = {
            name,
            email,
            avatar_id,
            ...(rest.oldPassword ? rest : {}),
        };

        const response = yield call(api.put, 'users', profile);

        Alert.alert('Yup!', 'Profile updated!');

        yield put(updateProfileSuccess(response.data));
    } catch (err) {
        Alert.alert('Ops!', 'Something wrong!');
        yield put(updateProfileFailure());
    }
}

export default all([takeLatest('@user/UPDATE_PROFILE_REQUEST', updateProfile)]);
