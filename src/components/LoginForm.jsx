import { useState } from "react"
import symbol from "../assets/symbol.svg"
import { useMutation } from "@tanstack/react-query"
import mockLoginAPI from "../utils/mockLoginAPI"
import Input from "./Input"

function LoginForm() {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const mutation = useMutation({
        mutationFn: mockLoginAPI,
        onSuccess: () => {
          alert("Welcome!")
        }
      })

    function showErrorMessage(error) {
        if (!error) {
            return ""
        } else {
            return error.message
        }
    }

    function handleSubmit(e) {
        e.preventDefault()
        mutation.mutate({ email, password })
    }

    return (
            <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4">
                <div className="flex gap-[5px] justify-center">
                    <img src={symbol}/>
                    <h3 className="font-bold">Company</h3>
                </div>
                <form className="" onSubmit={(e) => handleSubmit(e)}>
                    <h2 className="text-2xl font-semibold">Sign in to your account to continue</h2>
                    <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
                    <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></Input>
                    {mutation.isError && (
                        <div className="text-red-600 text-sm mt-2">{showErrorMessage(mutation.error)}</div>
                    )}
                    <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">Log in</button>
                </form>
            </div>
    )
}

export default LoginForm