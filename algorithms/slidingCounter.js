function createSlidingCounter(maxRequests, windowSize) {
  let prevCount = 0;
  let currCount = 0;
  let windowStart = Date.now();

  return {
    allow() {
      const now = Date.now();
      const elapsed = now - windowStart;

      if (elapsed >= windowSize) {
        prevCount = currCount;
        currCount = 0;
        windowStart = now;
      }

      const weight = 1 - elapsed / windowSize;
      const estimated = prevCount * weight + currCount;

      if (estimated < maxRequests) {
        currCount += 1;
        return true;
      }
      return false;
    },
  };
}

export default createSlidingCounter;
