import { useState } from "react"
import { useMutation } from "@tanstack/react-query"
import mockLoginAPI from "../utils/mockLoginAPI"
import Input from "./Input"

function LoginForm({forwardFn}) {

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const mutation = useMutation({
        mutationFn: mockLoginAPI,
        onSuccess: () => {
          forwardFn()
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
        <form className="" onSubmit={(e) => handleSubmit(e)}>
            <h2 className="text-2xl font-semibold">Sign in to your account to continue</h2>
            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"></Input>
            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password"></Input>
            {mutation.isError && (
                <div className="text-red-600 text-sm mt-2">{showErrorMessage(mutation.error)}</div>
            )}
            <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">Log in</button>
        </form>
    )
}

export default LoginForm