import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
    LoginInterface,
    LoginInterfaceReturn,
    LogoutInterfaceReturn,
    SignupInterface,
    SignupInterfaceReturn,
} from "../types/User";

export const usersApi = createApi({
    reducerPath: "usersApi",
    baseQuery: fetchBaseQuery({
        baseUrl: "http://localhost:3000/",
        credentials: "include",
    }),
    endpoints: (builder) => ({
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
                url: "/users/signup",
                method: "POST",
                body: { username, password, departmentId },
            }),
        }),
        postUserLogout: builder.mutation<LogoutInterfaceReturn, null>({
            query: () => ({
                url: "/users/logout",
                method: "POST",
            }),
        }),
    }),
});

// Export hooks for using the endpoints in components
export const {
    usePostUserLoginMutation,
    usePostUserSignupMutation,
    usePostUserLogoutMutation,
} = usersApi;
