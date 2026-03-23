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


let isRefreshing = false;
let pendingReq: {
    resolve: (value: unknown) => void;
    reject: (value: unknown) => void
}[] = []
const processReq = (error: unknown) => {
    pendingReq.forEach(promise => {
        if (error) {
            promise.reject(error)
        }
        else {
            promise.resolve(null)
        }
    })

    pendingReq = []
}

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

        const originalReq = error.config as AxiosRequestConfig & {
            _retry: boolean;
        };

        console.log("org", originalReq)

        if (error.response.data.message === "jwt expired" && !originalReq._retry) {
            console.log("jwt expired")
            originalReq._retry = true;

            if (isRefreshing) {
                return new Promise((resolve, reject) => {
                    pendingReq.push({ resolve, reject })
                })
                    .then(() => axiosInstance(originalReq))
                    .catch(error => Promise.reject(error))
            }

            isRefreshing = true
            try {

                const res = await axiosInstance.post('/auth/refresh-token')
                console.log("new token arrived", res)

                processReq(null)
                return axiosInstance(originalReq) // the failed request will be recalled, which prevent logout
            }
            catch (error) {
                console.log("error on receiving new access token")
                console.log(error)
                processReq(error)
                return Promise.reject(error)
            }
            finally {
                isRefreshing = false;
            }

        }
        return Promise.reject(error);
    }
);
