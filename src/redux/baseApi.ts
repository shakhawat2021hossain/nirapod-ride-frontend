
import { createApi,  } from "@reduxjs/toolkit/query/react";
import axiosBaseQuery from "./axiosBaseQuery";
export const baseApi = createApi({
    reducerPath: 'baseApi',
    // baseQuery: fetchBaseQuery({ baseUrl: "https://nirapod-ride.vercel.app/api/v1", credentials: 'include'}),
    tagTypes: ["USER"],
    baseQuery: axiosBaseQuery() ,
    endpoints: () => ({}), 
})