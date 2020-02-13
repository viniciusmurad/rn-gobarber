import { Alert } from 'react-native';

import { takeLatest, call, put, all } from 'redux-saga/effects';

import { signInSuccess, signFailure } from './actions';

import api from '~/services/api';

export function* signIn({ payload }) {
    try {
        const { email, password } = payload;

        const response = yield call(api.post, 'sessions', {
            email,
            password,
        });

        const { token, user } = response.data;

        if (user.provider) {
            Alert.alert('Login fail.', 'You are not authorized to sign in!');
            return;
        }

        yield put(signInSuccess(token, user));

        // history.push('/dashboard');
    } catch (err) {
        Alert.alert('Login fail.', 'Something wrong! Try again.');
        yield put(signFailure());
    }
}

export function* signUp({ payload }) {
    try {
        const { name, email, password } = payload;
        yield call(api.post, 'users', {
            name,
            password,
            email,
        });
        // history.push('/');
    } catch (err) {
        Alert.alert('SignUp fail.', 'Something wrong! Try again.');
        yield put(signFailure());
    }
}

export function setToken({ payload }) {
    if (!payload) return;

    const { token } = payload.auth;

    if (token) {
        api.defaults.headers.Authorization = `Bearer ${token}`;
    }
}

export default all([
    takeLatest('persist/REHYDRATE', setToken),
    takeLatest('@auth/SIGN_IN_REQUEST', signIn),
    takeLatest('@auth/SIGN_UP_REQUEST', signUp),
]);
