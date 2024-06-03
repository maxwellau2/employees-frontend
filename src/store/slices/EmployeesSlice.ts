import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { Employee } from "../types/Employee";
import { EmployeesClient } from "../../utils/EmployeesClient";


export interface EmployeesState{
    values : Employee[],
}

const init: Employee[] = [];

const initialState: EmployeesState = {
    values: init,
}

export const EmployeesSlice = createSlice({
    name: "employees",
    initialState: initialState,
    reducers: {
        updateEmployees:  (state, action: PayloadAction<Employee[]>) =>{
                state.values = action.payload
            },
        }
    })

export const {updateEmployees} = EmployeesSlice.actions
export const selectEmployees = (state: RootState) => state.employees.values
export const EmployeeReducer =  EmployeesSlice.reducer
