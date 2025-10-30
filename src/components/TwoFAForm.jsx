import { useRef, useState, useEffect } from "react"
import { useMutation } from "@tanstack/react-query"
import mock2FA from "../utils/mock2FA"

function TwoFAForm({backFn, onSuccess}) {

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

  function handleResend() {
    setDigits(initialDigits)
    setTimer(10)
    setCanResend(false)
    inputsRef.current[0].focus()
  }

  useEffect(() => {
    if (code.length === 6 && !mutation.isPending) {
      mutation.mutate({ code })
    }
  }, [code])

    return (
      <form>
        <h2 className="text-2xl font-semibold mb-2">Two-Factor Authentication</h2>
        <p> Enter the 6-digit code from the Google Authenticator app </p>

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
              className="w-12 h-12 border border-gray-300 text-center text-xl rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {mutation.isError && (
        <div className="text-red-600 text-sm mt-2">{"Invalid code"}</div>
        )}

        {canResend && (
          <button onClick={() => handleResend()} className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">
            Get new
          </button>
        )}

        <button onClick={backFn} className="cursor-pointer" >Back</button>
      </form>
    )
}

export default TwoFAForm