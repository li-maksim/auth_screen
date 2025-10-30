async function mock2FA({ code }) {
  await new Promise((res) => setTimeout(res, 500))

  if (code === "123456") {
    return { success: true }
  } else {
    throw { code: "INVALID_CODE", message: "Invalid verification code" }
  }
}

export default mock2FA