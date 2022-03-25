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
    token: {},
    
    fetchUser : {
        status: STATUS.IDLE,
        error: {},
        userdetail: {}
    }
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
                    console.log(res.data);
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
        console.log(data);
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', data, () => {
            source.cancel();
        })
        const response = await axios.post(url,data,
            {
                headers: { "Authorization": data.jwt}
            })
        return response.data;
    }
)
export const fetchBearerToken = createAsyncThunk(
    "loginSlice/token",
    async (data, { signal }) => {
        const url = `/myApp/api/authenticate`;
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', data, () => {
            source.cancel();
        })
        const response = await axios.post(url,data)
        return response.data;
    }
)

export const fetchUser = createAsyncThunk(
    "loginSlice/user",
    async (data, { signal }) => {
        console.log(data)
        const url = `/myApp/api/user`;
        const source = axios.CancelToken.source()
        signal.addEventListener('abort', data, () => {
            source.cancel();
        })
        const response = await axios.get(url,
            {
                headers: { "Authorization": data}
            })
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
            state.token = payload;
            console.log(state.token )
        },
        authFailure(state, { payload }) {
            state.status = STATUS.ERROR;
            state.error = { message: payload.errorMessage}
        }
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
        [fetchBearerToken.pending] : (state, { meta }) => {
            if (state.status !== STATUS.LOADING) {
                state.status = STATUS.LOADING;
            }
        },
        [fetchBearerToken.fulfilled] : (state, { payload, meta }) => {
            if (payload !== undefined && payload.successCode === '200') {
                state.status = STATUS.SUCCESS;
                state.token = payload;
                console.log(state.token)
            } else {
                state.status = STATUS.ERROR;
                state.error = { message: payload.errorMessage}
            }
        },
        [fetchBearerToken.rejected] : (state, { meta, error }) => {
            if (meta.ABORTED) {
                state.status = STATUS.ABORTED;
            } else {
                state.status = STATUS.ERROR;
                state.error = error;
            }
        },
        [fetchUser.pending] : (state, { meta }) => {
            if (state.fetchUser.status !== STATUS.LOADING) {
                state.fetchUser.status = STATUS.LOADING;
            }
        },
        [fetchUser.fulfilled] : (state, { payload, meta }) => {
            if (payload !== undefined && payload.successCode === '200') {
                state.fetchUser.status = STATUS.SUCCESS;
                state.fetchUser.userdetail = payload;
            } else {
                state.fetchUser.status = STATUS.ERROR;
                state.fetchUser.error = { message: payload.errorMessage}
            }
        },
        [fetchUser.rejected] : (state, { meta, error }) => {
            if (meta.ABORTED) {
                state.fetchUser.status = STATUS.ABORTED;
            } else {
                state.fetchUser.status = STATUS.ERROR;
                state.error = error;
            }
        }
    }
})


export const { loginResponse, loginFailure, resetUser, authSuccess, authFailure } = loginSlice.actions;