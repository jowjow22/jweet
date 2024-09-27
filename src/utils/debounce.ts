export  const debounce = (fn: (..._params: unknown[]) => unknown, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  return function (...args: unknown[]) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}