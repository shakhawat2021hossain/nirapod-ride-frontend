import { baseApi } from "@/redux/baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation({
            query: (userInfo) => ({
                url: '/auth/register',
                method: 'POST',
                data: userInfo,
            })
        }),
        logOut: build.mutation({
            query: () => ({
                url: '/auth/logout',
                method: 'POST',
            })
        }),
        login: build.mutation({
            query: (userInfo) => ({
                url: "/auth/login",
                method: "POST",
                data: userInfo,
            })
        }),
        userInfo: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"],
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useUserInfoQuery, useLogOutMutation } = authApi