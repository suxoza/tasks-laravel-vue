export const callback = (callbackFunc: CallableFunction, timeout = 1000) => setTimeout(() => callbackFunc(), timeout)
