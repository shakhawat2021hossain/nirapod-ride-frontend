import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
    InputOTPSeparator,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { useVerifyOtpMutation, useSendOtpMutation } from "@/redux/features/auth/auth.api";
import type { IError } from "@/types";
import toast from "react-hot-toast";

export default function OtpVerification() {
    const navigate = useNavigate();
    const location = useLocation();

    const email = location.state?.email;

    const [otp, setOtp] = useState("");
    const [sendOtp] = useSendOtpMutation();
    const [verifyOtp, { isLoading }] = useVerifyOtpMutation();

    // Guard
    useEffect(() => {
        if (!email) navigate("/login");
    }, [email, navigate]);

    // Auto-send OTP for existing users
    useEffect(() => {
        if (email) {
            sendOtp({ email });
        }
    }, [email, sendOtp]);

    const handleVerify = async () => {
        if (otp.length !== 6) return;

        try {
            const result = await verifyOtp({ email, otp }).unwrap();
            if (result?.success) {
                navigate("/login");
                toast.success("You are now a verifed user")
            }

        } catch (err) {
            const error = err as IError;
            console.log("Error data:", error.data);
            toast.error(error.data?.message || "OTP verification failed");
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <div className="w-full max-w-md p-6 border rounded-lg">
                <h2 className="text-xl font-semibold text-center mb-4">
                    Verify your email
                </h2>

                <p className="text-sm text-center text-muted-foreground mb-6">
                    Enter the 6-digit code sent to <b>{email}</b>
                </p>

                <div className="flex justify-center mb-6">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                {/* {error && (
                    <p className="text-sm text-red-500 text-center mb-4">
                        {(error as any)?.data?.message || "Invalid or expired OTP"}
                    </p>
                )} */}

                <Button
                    className="w-full"
                    onClick={handleVerify}
                    disabled={isLoading || otp.length !== 6}
                >
                    {isLoading ? "Verifying..." : "Verify OTP"}
                </Button>
            </div>
        </div>
    );
}
