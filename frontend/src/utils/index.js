/**
 * Delay react lazy import to prevent flash fallback
 * @param {number} ms - setTimeout delay ms
 */
function delayLazy(ms = 300) {
  return (promise) =>
    promise.then(
      (data) =>
        new Promise((resolve) => {
          setTimeout(() => resolve(data), ms);
        })
    );
}

const formatNumber = (number, formatterConfig = { minimumFractionDigits: 0 }) =>
  ![undefined, null].includes(number) &&
  new Intl.NumberFormat("en-US", formatterConfig).format(number);

export { delayLazy, formatNumber };
