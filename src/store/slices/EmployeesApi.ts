import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    Employee,
    EmployeeWindow,
    CreateEmployeeResponseTemplate,
    EmployeeWindowReturn,
    TimeoutReturn,
} from "../types/Employee";
import {
    LoginInterface,
    LoginInterfaceReturn,
    LogoutInterfaceReturn,
    SignupInterface,
    SignupInterfaceReturn,
} from "../types/User";

export const employeesApi = createApi({
    reducerPath: "employeesApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
        credentials: "include",
    }),
    tagTypes: ["Employees"],
    endpoints: (builder) => ({
        getAllEmployees: builder.query<Employee[], void>({
            query: () => "/api/employee",
            providesTags: ["Employees"],
        }),
        getEmployeeById: builder.query<Employee, number>({
            query: (id) => `/api/employee/${id}`,
            providesTags: ["Employees"],
        }),
        createNewEmployee: builder.mutation<
            CreateEmployeeResponseTemplate,
            Employee
        >({
            query: (employee) => ({
                url: "/api/employee",
                method: "POST",
                body: employee,
            }),
            invalidatesTags: ["Employees"],
        }),
        modifyEmployee: builder.mutation<
            CreateEmployeeResponseTemplate,
            Employee
        >({
            query: (employee) => ({
                url: `/api/employee/${employee.id}`,
                method: "PUT",
                body: {
                    name: employee.name,
                    department: employee.department,
                    salary: employee.salary,
                },
            }),
            invalidatesTags: ["Employees"],
        }),
        deleteEmployee: builder.mutation<Employee | null, number>({
            query: (id) => ({
                url: `/api/employee/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Employees"],
        }),
        getEmployeeWindow: builder.query<EmployeeWindowReturn, EmployeeWindow>({
            query: ({ pageNumber, windowSize }) => ({
                url: "/api/employees",
                method: "GET",
                params: { pageNumber, windowSize },
                credentials: "include",
            }),
            providesTags: ["Employees"],
        }),
        postUserLogin: builder.mutation<LoginInterfaceReturn, LoginInterface>({
            query: ({ username, password }) => ({
                url: "/users/login",
                method: "POST",
                body: { username, password },
            }),
        }),
        postUserSignup: builder.mutation<
            SignupInterfaceReturn,
            SignupInterface
        >({
            query: ({ username, password, departmentId }) => ({
                url: "users/signup",
                method: "POST",
                body: { username, password, departmentId },
            }),
        }),
        postUserLogout: builder.mutation<LogoutInterfaceReturn, null>({
            query: () => ({
                url: "users/logout",
                method: "POST",
            }),
        }),
    }),
});

// Export hooks for using the endpoints in components
export const {
    useGetAllEmployeesQuery,
    useGetEmployeeByIdQuery,
    useCreateNewEmployeeMutation,
    useModifyEmployeeMutation,
    useDeleteEmployeeMutation,
    useGetEmployeeWindowQuery,
    usePostUserLoginMutation,
    usePostUserSignupMutation,
    usePostUserLogoutMutation,
} = employeesApi;
