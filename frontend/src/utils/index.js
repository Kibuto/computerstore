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

export { delayLazy };
