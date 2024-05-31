import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee, EmployeeWindow, CreateEmployeeResponseTemplate, EmployeeWindowReturn } from './types/Employee';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  tagTypes: ['Employees'],
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => 'employee',
      providesTags: ['Employees']
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `employee/${id}`,
      providesTags: ['Employees']
    }),
    createNewEmployee: builder.mutation<CreateEmployeeResponseTemplate, Employee>({
      query: (employee) => ({
        url: 'employee',
        method: 'POST',
        body: employee,
        providesTags: ['Employees']
      }), invalidatesTags:["Employees"],
    }),
    modifyEmployee: builder.mutation<CreateEmployeeResponseTemplate, Employee>({
      query: (employee) => ({
        url: `employee/${employee.id}`,
        method: 'PUT',
        body: {name:employee.name, department:employee.department, salary:employee.salary},
        providesTags: ['Employees']
      }),invalidatesTags:["Employees"],
    }),
    deleteEmployee: builder.mutation<Employee|null, number>({
      query: (id) => ({
        url: `employee/${id}`,
        method: 'DELETE',
        providesTags: ['Employees']
      }),invalidatesTags:["Employees"],
    }),
    getEmployeeWindow: builder.query<EmployeeWindowReturn, EmployeeWindow>({
      query: ({ pageNumber, windowSize }) => ({
        url: 'employees',
        method: 'GET',
        params: { pageNumber, windowSize },
        providesTags: ['Employees']
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
} = employeesApi;