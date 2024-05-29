import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../Store";
import { Employee } from "../types/Employee";
import { EmployeesClient } from "../../utils/EmployeesClient";


export interface EmployeesState{
    values : Employee[],
}

const Penis: Employee[] = [
    // { name: "John Doe1", salary: 75000, department: "Engineering" },
    // { name: "Jane Smith", salary: 80000, department: "Marketing" },
    // { name: "Michael Johnson", salary: 65000, department: "Sales" },
    // { name: "Emily Davis", salary: 90000, department: "Human Resources" },
    // { name: "William Brown", salary: 70000, department: "Engineering" },
    // { name: "Olivia Wilson", salary: 85000, department: "Finance" },
    // { name: "James Anderson", salary: 72000, department: "Sales" },
    // { name: "Sophia Martinez", salary: 78000, department: "Marketing" },
    // { name: "Benjamin Lee", salary: 95000, department: "Engineering" },
    // { name: "Ava Walker", salary: 69000, department: "Customer Service" }
];

const initialState: EmployeesState = {
    values: Penis,
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
