import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import cartReducer from './slices/cartSlice';
import userReducer from './slices/userSlice';

// Configure persistence for the user slice only
const userPersistConfig = {
    key: 'root', // Customize this key if needed
    storage,
};
const persistedCartReducer = persistReducer(userPersistConfig, cartReducer);
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
// Combine reducers, persisting only the user slice
const rootReducer = combineReducers({
    cart: persistedCartReducer,
    // gioithieu: gioithieuReducer,
    user: persistedUserReducer,
    // thuonghieu: thuonghieuReducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        }),
});

const persistor = persistStore(store);

export { store, persistor };
