import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { UserRound, LockKeyhole } from "lucide-react";
import mockLoginAPI from "../utils/mockLoginAPI";
import Input from "./Input";

function LoginForm({ forwardFn }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const mutation = useMutation({
    mutationFn: mockLoginAPI,
    onSuccess: () => {
      forwardFn();
    },
  });

  function showErrorMessage(error) {
    if (!error) {
      return "";
    } else {
      return error.message;
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate({ email, password });
  }

  let isFormValid = email !== "" && password !== "";

  return (
    <form className="" onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-2xl font-medium text-center ">
        Sign in to your account to continue
      </h2>
      <div className="mt-[24px] flex flex-col gap-[16px]">
        <div className="relative">
          <UserRound className="absolute left-3 top-[11px] text-gray-400 w-4 h-4" />
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          ></Input>
        </div>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-3 text-gray-400 w-4 h-4" />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          ></Input>
          {mutation.isError && (
            <div className="text-red-400 text-sm mt-[6px]">
              {showErrorMessage(mutation.error)}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={!isFormValid}
          className={
            isFormValid
              ? "w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer"
              : "w-full bg-gray-100 text-gray-400 border border-gray-300 py-2 rounded-md"
          }
        >
          Log in
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
