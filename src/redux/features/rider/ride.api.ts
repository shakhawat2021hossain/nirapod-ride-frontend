import { baseApi } from "@/redux/baseApi";

export const rideApi = baseApi.injectEndpoints({
    endpoints: (build) => ({
        rides: build.query({
            query: () => ({
                url: '/ride/my-rides',
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
        book: build.mutation({
            query: (rideData) => ({
                url: "/ride/request",
                method: "POST",
                data: rideData,
            }),
            invalidatesTags: ["RIDE"]
        }),
    })
})

export const { useRidesQuery, useBookMutation, useGetRideByIdQuery } = rideApi