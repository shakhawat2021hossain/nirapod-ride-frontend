import { baseApi } from "@/redux/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateStatus: build.mutation({
            query: ({status, id}) => ({
                url: `/ride/${id}/update-status`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["RIDE"]
        }),
        toggleAvailability: build.mutation({
            query: () => ({
                url: "/user/availability",
                method: "PATCH",
            }), 
            invalidatesTags: ["USER"]
        
        }),
        getUsers: build.query({
            query: () => ({
                url: '/user/all-use',
                method: "GET",
            }),
            providesTags: ["USER"]
        }),
        userInfo: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"],
            transformResponse: (response) => response?.data
        }),
        updateUser: build.mutation({
            query: ({id, payload}) =>({
                url: `/user/${id}`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["USER"]
        })
    })
})

export const { useToggleAvailabilityMutation, useGetUsersQuery, useUpdateUserMutation, useUserInfoQuery } = userApi