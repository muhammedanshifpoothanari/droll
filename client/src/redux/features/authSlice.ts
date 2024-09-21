import { PayloadAction, createSlice } from "@reduxjs/toolkit";

type InitialState = {
    isAuth: boolean;
    session: null | unknown;
    isLoading: boolean;
    ethereumAddress: string | null; // Ethereum address stored here
};

const initialState: InitialState = {
    isAuth: false,
    session: null,
    isLoading: false,
    ethereumAddress: null, // Initialize ethereumAddress as null
};

export const auth = createSlice({
    name: "auth",
    initialState,
    reducers: {
        logUser: (state, { payload }: PayloadAction<{ address: string }>) => {
            state.isAuth = true;
            state.session = payload;
            state.ethereumAddress = payload.address; // Store Ethereum address in the state
        },
        logout: (state) => {
            state.isAuth = false;
            state.session = null;
            state.ethereumAddress = null; // Reset Ethereum address on logout
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

export default auth.reducer;
