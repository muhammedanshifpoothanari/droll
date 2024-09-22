// src/redux/features/authSlice.ts
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isAuth: boolean;
    session: null | unknown;
    isLoading: boolean;
    ethereumAddress: string | null;  
    contract:any
};

const initialState: InitialState = {
    isAuth: false,
    session: null,
    isLoading: false,
    ethereumAddress: null,  
    contract:null
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, { payload }: PayloadAction<{
            contract: any; address: string 
}>) => {
            state.isAuth = true;
            state.session = payload;
            state.ethereumAddress = payload.address; // Store Ethereum address in the state
            state.contract = payload.contract
        },
        logout: (state) => {
            state.isAuth = false;
            state.session = null;
             state.ethereumAddress = null;
             state.contract = null;
        },
    },
});

export const { logUser, logout } = auth.actions;

interface AuthReducerState {
    ethereumAddress: string | null; // Adjust the type as needed
    isAuth: boolean;
    session: any;
}

interface RootState {
    authReducer: AuthReducerState;
}

// Selector function to get the user details
export const selectUserDetails = (state: RootState) => ({
    ethereumAddress: state.authReducer.ethereumAddress,
    isAuth: state.authReducer.isAuth,
    session: state.authReducer.session
});

export const selectEthereumAddress = (state: RootState) => state.authReducer.ethereumAddress;

export default auth.reducer;




// import { useDispatch } from 'react-redux';
// import { logUser } from '@/redux/features/authSlice';

// const dispatch = useDispatch();

// const handleLogin = (userAddress: string) => {
//     dispatch(logUser({ address: userAddress }));
// };