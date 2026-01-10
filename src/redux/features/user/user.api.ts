import { baseApi } from "@/redux/baseApi";


export const userApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        updateStatus: build.mutation({
            query: ({ status, id }) => ({
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
        allUsers: build.query({
            query: () => ({
                url: '/user/all-user',
                method: "GET",
            }),
            providesTags: ["USER"],
            transformResponse: (response) => response?.data,
        }),
        userInfo: build.query({
            query: () => ({
                url: "/user/me",
                method: "GET"
            }),
            providesTags: ["USER"],
            transformResponse: (response) => response?.data
        }),
        becomeDriver: build.mutation({
            query: (payload) => ({
                url: "/user/become-driver",
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["USER"]
        }),
        updateUser: build.mutation({
            query: ({ id, payload }) => ({
                url: `/user/${id}`,
                method: "PATCH",
                data: payload
            }),
            invalidatesTags: ["USER"]
        }),
        approveDriver: build.mutation({
            query: ({ id, status }) => ({
                url: `/user/driver-request/${id}/approve?status=${status}`,
                method: "PATCH"
            }),
            invalidatesTags: ["USER"]
        }),
        blockUser: build.mutation({
            query: (id) => ({
                url: `/user/${id}/toggle-block`,
                method: "PATCH",
            }),
        }),
        changePass: build.mutation({
            query: (pass) => ({
                url: '/user/change-password',
                method: "PATCH",
                data: pass
            }),
        }),
    })
})

export const {
    useToggleAvailabilityMutation,
    useAllUsersQuery,
    useUpdateUserMutation,
    useUserInfoQuery,
    useApproveDriverMutation,
    useBlockUserMutation,
    useChangePassMutation,
    useBecomeDriverMutation
} = userApi