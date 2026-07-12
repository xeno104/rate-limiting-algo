function createFixedWindow(maxRequests, windowSize) {
  let windowStart = Date.now();
  let count = 0;

  function resetIfNeeded() {
    const now = Date.now();
    if (now - windowStart >= windowSize) {
      windowStart = now;
      count = 0;
    }
  }

  return {
    allow() {
      resetIfNeeded();
      if (count < maxRequests) {
        count += 1;
        return true;
      }
      return false;
    },
  };
}

export default createFixedWindow;
