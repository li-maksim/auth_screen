import { useState } from "react"
import { QueryClient, QueryClientProvider} from "@tanstack/react-query"
import symbol from "../assets/symbol.svg"
import { ArrowLeft } from "lucide-react"
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
        return
    }

    return (
        <QueryClientProvider client={queryClient}>
            <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4 h-fit relative">

                {step > 1 && (
                <button onClick={() => back()}className="absolute top-6 left-6 text-gray-600 hover:text-gray-800">
                <ArrowLeft size={18} />
                </button>
                )}

                <div className="flex gap-[5px] justify-center">
                    <img src={symbol}/>
                    <h3 className="font-semibold">Company</h3>
                </div>
                {step === 1 && <LoginForm forwardFn={forward} />}
                {step === 2 && <TwoFAForm onSuccess={onSuccess} />}
            </div>
        </QueryClientProvider>
    )
}

export default LoginScreen