import { useRef, useState } from "react"

function TwoFAForm({backFn}) {

  const [digits, setDigits] = useState(["", "", "", "", "", ""])
  const inputsRef = useRef([])

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

    return (
      <div className="bg-white p-8 rounded-2xl w-full max-w-md space-y-4">
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

          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded-md cursor-pointer">Continue</button>

          <button onClick={backFn} className="cursor-pointer" >Back</button>
        </form>
      </div>
    )
}

export default TwoFAForm