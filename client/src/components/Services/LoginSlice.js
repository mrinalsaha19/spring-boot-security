import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const STATUS = {
    IDLE: "idle",
    LOADING: 'loading',
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    ABORTED: 'aborted'
};

const init = {
    status: STATUS.IDLE,
    error: {},
    postLogin: {
        status: STATUS.IDLE,
        error: null,
    },
    user: {},
    token:''
}

export function postLogin(data) {
    return async (dispatch, getState) => {
        await axios.post("/myApp/api/login",data).
            then((res) => {
                if (res.status === 200 && res.data.successCode ==='200') {
                    dispatch(loginResponse(res.data));  
                } else if(res.status === 200 && res.data.errorCode === '303'){
                    dispatch(loginFailure(res.data));
                }
            })
    }
}

export function authenticate(data) {
    return async (dispatch, getState) => {
        await axios.post("/myApp/api/authenticate",data).
            then((res) => {
                if (res.status === 200 && res.data.successCode ==='200') {
                    dispatch(authSuccess(res.data));  
                } else if(res.status === 200 && res.data.errorCode === '303'){
                    dispatch(authFailure(res.data));
                }
            })
    }
}

// ***************** This is another way of using redux call, using AsyncThunk ******************
export const loginUsingThunk = createAsyncThunk(
    "loginSlice/login",
    async (data, { signal }) => {
        const url = `/myApp/api/login`;
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', data, () => {
            source.cancel();
        })
        const response = await axios.post(url,data)
        return response.data;
    }
)

export const loginSlice = createSlice({
    name: 'loginSlice',
    initialState: init,
    reducers: {
        loginResponse(state, { payload }) {
            state.status = STATUS.SUCCESS;
            state.user = payload;
        },
        loginFailure(state, { payload }) {
            state.status = STATUS.ERROR;
            state.error = { message: payload.errorMessage}
        },
        resetUser(state, { payload }) {
            state = init;
            return state;
        },
        authSuccess(state, { payload }) {
            state.status = STATUS.SUCCESS;
            state.token = payload.jwt;
        },
        authFailure(state, { payload }) {
            state.status = STATUS.ERROR;
            state.error = { message: payload.errorMessage}
        },
    },
    extraReducers: {
        [loginUsingThunk.pending] : (state, { meta }) => {
            if (state.status !== STATUS.LOADING) {
                state.status = STATUS.LOADING;
            }
        },
        [loginUsingThunk.fulfilled] : (state, { payload, meta }) => {
            if (payload !== undefined && payload.successCode === '200') {
                state.status = STATUS.SUCCESS;
                state.user = payload;
            } else {
                state.status = STATUS.ERROR;
                state.error = { message: payload.errorMessage}
            }
        },
        [loginUsingThunk.rejected] : (state, { meta, error }) => {
            if (meta.ABORTED) {
                state.status = STATUS.ABORTED;
            } else {
                state.status = STATUS.ERROR;
                state.error = error;
            }
        },
    }
})


export const { loginResponse, loginFailure, resetUser, authSuccess, authFailure } = loginSlice.actions;