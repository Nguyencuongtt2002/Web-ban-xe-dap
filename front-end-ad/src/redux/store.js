import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import userReducer from './slices/userSlice';

// Configure persistence for the user slice only
const userPersistConfig = {
    key: 'root', // Customize this key if needed
    storage,
};
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
// Combine reducers, persisting only the user slice
const rootReducer = combineReducers({
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
