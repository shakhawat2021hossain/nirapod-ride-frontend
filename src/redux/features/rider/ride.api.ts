import { baseApi } from "@/redux/baseApi";



export const rideApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        allRides: build.query({
            query: () => ({
                url: '/ride/all-rides',
                method: "GET"
            }),
            providesTags: ["RIDE"]
        }),
        rides: build.query({
            query: () => ({
                url: '/ride/my-rides',
                method: "GET"
            }),
            providesTags: ["RIDE"]
        }),
        availableRides: build.query({
            query: () => ({
                url: '/ride/available-rides',
                method: "GET"
            }),
            providesTags: ["RIDE"]
        }),
        getRideById: build.query({
            query: (id) => ({
                url: `/ride/${id}`,
                method: "GET"
            }),
            providesTags: ["RIDE"]
        }),
        driverRides: build.query({
            query: () => ({
                url: '/ride/driver-rides',
                method: "GET"
            }),
            providesTags: ["RIDE"]
        }),
        book: build.mutation({
            query: (rideData) => ({
                url: "/ride/request",
                method: "POST",
                data: rideData,
            }),
            invalidatesTags: ["RIDE"]
        }),
        updateStatus: build.mutation({
            query: ({status, id}) => ({
                url: `/ride/${id}/update-status`,
                method: "PATCH",
                data: status,
            }),
            invalidatesTags: ["RIDE"]
        }),
        acceptRide: build.mutation({
            query: (id) => ({
                url: `/ride/${id}/accept-ride`,
                method: "PATCH",
            }),
            invalidatesTags: ["RIDE"]
        }),
        earnings: build.query({
            query: () => ({
                url: `/ride/earnings`,
                method: "GET",
            }),
        }),
    })
})

export const { useAllRidesQuery, useRidesQuery, useBookMutation, useGetRideByIdQuery, useAvailableRidesQuery, useUpdateStatusMutation, useAcceptRideMutation, useDriverRidesQuery, useEarningsQuery } = rideApi