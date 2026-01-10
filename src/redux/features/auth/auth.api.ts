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
        sendOtp: build.mutation({
            query: (payload) => ({
                url: "/otp/send-otp",
                method: "POST",
                data: payload,
            })
        }),
        verifyOtp: build.mutation({
            query: (payload) => ({
                url: "/otp/verify-otp",
                method: "POST",
                data: payload,
            })
        })
    })
})

export const { useRegisterMutation, useLoginMutation, useLogOutMutation, useVerifyOtpMutation, useSendOtpMutation } = authApi