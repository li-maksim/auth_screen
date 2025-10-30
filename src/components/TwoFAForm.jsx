import { useRef, useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import mock2FA from "../utils/mock2FA"

function TwoFAForm({onSuccess}) {

  const initialDigits = ["", "", "", "", "", ""]

  const [digits, setDigits] = useState(initialDigits)
  const [timer, setTimer] = useState(10)
  const [canResend, setCanResend] = useState(false)
  const inputsRef = useRef([])
  const timeoutRef = useRef(null)

  const mutation = useMutation({
    mutationFn: mock2FA,
    onSuccess: () => {
      onSuccess()
    },
  })

  useEffect(() => {
    if (timer > 0) {
      timeoutRef.current = setTimeout(() => setTimer((t) => t - 1), 1000)
    } else {
      setCanResend(true)
    }

    return () => clearTimeout(timeoutRef.current)
  }, [timer])

  function handleInputsChange(index, value) {
    const newDigits = [...digits]
    newDigits[index] = value
    setDigits(newDigits)

    if (value && index < 5) {
      inputsRef.current[index + 1].focus()
    }
  }

  function handleKeyDown(index, e) {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputsRef.current[index - 1].focus()
    }
  }

  let code = digits.join("")
  let isCodeComplete = code.length === 6

  useEffect(() => {
    if (isCodeComplete && !mutation.isPending) {
      mutation.mutate({ code })
    }
  }, [code])

  let isCodeWrong = isCodeComplete && mutation.isError
  let isSuccesful = isCodeComplete && !mutation.isPending && !mutation.isError

  function handleResend() {
    setDigits(initialDigits)
    setTimer(10)
    setCanResend(false)
    inputsRef.current[0].focus()
  }

  function handleSubmit(e) {
    e.preventDefault()
    alert("Welcome!")
  }

  return (
    <form onSubmit={(e) => handleSubmit(e)}>
      <h2 className="text-2xl text-center font-semibold mb-2">Two-Factor Authentication</h2>
      <p className="text-center font-light"> Enter the 6-digit code from the Google Authenticator app </p>

      <div className="flex justify-between gap-2 mt-4">
        {digits.map((digit, i) => (
          <input
            key={i}
            type="text"
            maxLength="1"
            value={digit}
            onChange={(e) => handleInputsChange(i, e.target.value)}
            onKeyDown={(e) => handleKeyDown(i, e)}
            ref={(el) => (inputsRef.current[i] = el)}
            className={
              !isCodeWrong
                ? "w-[52px] h-[60px] border border-gray-300 text-center text-xl font-semibold rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                : "w-[52px] h-[60px] border border-gray-300 text-center text-xl font-semibold rounded-md border-red-400 focus:ring-red-400"
            }
          />
        ))}
      </div>

      {isCodeWrong && (
      <div className="text-red-400 text-sm mt-[6px]">{"Invalid code"}</div>
      )}

      {(canResend && !isCodeComplete) && (
        <button onClick={() => handleResend()} className="w-full bg-blue-600 mt-[16px] text-white py-2 rounded-md cursor-pointer">
          Get new
        </button>
      )}

      {isCodeComplete && (
        <button 
          type="submit" 
          className={
            isSuccesful
              ? "w-full bg-blue-600 mt-[16px] text-white py-2 rounded-md cursor-pointer"
              : "w-full bg-gray-100 mt-[16px] text-gray-300 py-2 rounded-md"
          }>
          Continue
        </button>
      )}
    </form>
  )
}

export default TwoFAForm