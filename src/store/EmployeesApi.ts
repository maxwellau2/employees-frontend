import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Employee, EmployeeWindow } from './types/Employee';

export const employeesApi = createApi({
  reducerPath: 'employeesApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
  endpoints: (builder) => ({
    getAllEmployees: builder.query<Employee[], void>({
      query: () => 'employee',
    }),
    getEmployeeById: builder.query<Employee, number>({
      query: (id) => `employee/${id}`,
    }),
    createNewEmployee: builder.mutation<Employee|null, Employee>({
      query: (employee) => ({
        url: 'employee',
        method: 'POST',
        body: employee,
      }),
    }),
    modifyEmployee: builder.mutation<Employee|null, Employee>({
      query: ({ id, ...employee }) => ({
        url: `employee/${id}`,
        method: 'PUT',
        body: employee,
      }),
    }),
    deleteEmployee: builder.mutation<Employee|null, number>({
      query: (id) => ({
        url: `employee/${id}`,
        method: 'DELETE',
      }),
    }),
    getEmployeeWindow: builder.query<Employee[], EmployeeWindow>({
      query: ({ start, windowSize }) => ({
        url: 'employees',
        method: 'GET',
        params: { start, windowSize },
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