import axios, { type AxiosRequestConfig } from "axios";
export const axiosInstance = axios.create({
    // baseURL: "https://nirapod-ride.vercel.app/api/v1",
    baseURL: "http://localhost:5000/api/v1",
    withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
    // Do something before request is sent
    return config;
}, function (error) {
    // Do something with request error
    return Promise.reject(error);
}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
    // function onFulfilled(response) {
    //     return response;
    // },
    // function onRejected(error) {
    //     return Promise.reject(error);
    // }
    (response) => {
        return response;
    },
    async (error) => {
        console.log("error", error)
        
        const orginalReq = error.config as AxiosRequestConfig;
       
        console.log("org", orginalReq)

        if (error.response.data.message === "jwt expired") {
            try {
                console.log("jwt expired")
                const res = await axiosInstance.post('/auth/refresh-token')
                console.log("new token arrived", res)
                return axiosInstance(orginalReq) // the failed request will be recalled, which prevent logout
            }
            catch (err) {
                console.log("err on receiving new access token")
                console.log(err)
            }
        }
        return Promise.reject(error);
    }
);
