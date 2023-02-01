import { configureStore } from '@reduxjs/toolkit'
import addressReducer from './reducers/addressSlice'

export const store = configureStore({
    reducer: {
        address: addressReducer,
    },
})