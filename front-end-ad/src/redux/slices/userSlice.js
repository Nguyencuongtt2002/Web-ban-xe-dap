import { createSlice } from '@reduxjs/toolkit';
export const userSlice = createSlice({
    name: 'user',
    initialState: {
        account: {
            ID: '',
            Taikhoan: '',
            Gmail: '',
            HoTen: '',
            AnhDaiDien: '',
            Token: '',
            Quyen: '',
        },
        loggedIn: false,
    },
    reducers: {
        loginSuccess: (state, action) => {
            console.log('Action:', action);
            console.log('Payload:', action.payload);

            return {
                ...state,
                account: {
                    account: {
                        ID: action.payload ? action.payload.ID || '' : '',
                        TaiKhoan: action.payload ? action.payload.TaiKhoan || '' : '',
                        Gmail: action.payload ? action.payload.Gmail || '' : '',
                        HoTen: action.payload ? action.payload.HoTen || '' : '',
                        Token: action.payload ? action.payload.Token || '' : '',
                        Quyen: action.payload ? action.payload.Quyen || '' : ''
                    },
                },
                loggedIn: true
            };
        },
        logout: (state) => {
            return {
                ...state,
                loggedIn: false,
                account: {
                    ID: '',
                    Taikhoan: '',
                    Email: '',
                    HoTen: '',
                    AnhDaiDien: '',
                    Token: '',
                    Quyen_ID: '',
                }
            };
        },

    },
    extraReducers: (builder) => {

    },
});

export const { loginSuccess, logout } = userSlice.actions;

export default userSlice.reducer;

