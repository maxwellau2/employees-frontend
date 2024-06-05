import { configureStore } from "@reduxjs/toolkit";
import { employeesApi } from "./slices/EmployeesApi";
import { EmployeeReducer } from "./slices/EmployeesSlice";

export const store = configureStore({
    reducer: {
        [employeesApi.reducerPath]: employeesApi.reducer,
        employees: EmployeeReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(employeesApi.middleware),
    
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch