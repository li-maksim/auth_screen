import { useState } from "react"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import symbol from "../assets/symbol.svg"
import LoginForm from "./LoginForm"
import TwoFAForm from "./TwoFAForm"

const queryClient = new QueryClient()

function LoginScreen() {

    const [step, setStep] = useState(1)

    function forward() {
        setStep(step + 1)
    }

    function back() {
        setStep(step - 1)
    }

    function onSuccess() {
        alert("Welcome!")
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4">
                <div className="flex gap-[5px] justify-center">
                    <img src={symbol}/>
                    <h3 className="font-bold">Company</h3>
                </div>
                {step === 1 && <LoginForm forwardFn={forward} />}
                {step === 2 && <TwoFAForm backFn={back} onSuccess={onSuccess} />}
            </div>
        </QueryClientProvider>
    )
}

export default LoginScreen