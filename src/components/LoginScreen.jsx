import { useState } from "react"
import symbol from "../assets/symbol.svg"
import Input from "./Input"

function LoginScreen() {

    return (
        <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4">
            <div className="flex gap-[5px] justify-center">
                <img src={symbol}/>
                <h3 className="font-bold">Company</h3>
            </div>
            <form className="">
                <h2 className="text-2xl font-semibold">Sign in to your account to continue</h2>
                <Input type="email" value="" placeholder="Email"></Input>
                <Input type="text" value="" placeholder="Password"></Input>
                <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">Log in</button>
            </form>
        </div>
    )
}

export default LoginScreen