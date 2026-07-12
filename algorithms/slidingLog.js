function createSlidingLog(maxRequests, windowSize) {
  let timestamps = [];

  return {
    allow() {
      const now = Date.now();
      timestamps = timestamps.filter((ts) => now - ts < windowSize);
      if (timestamps.length < maxRequests) {
        timestamps.push(now);
        return true;
      }
      return false;
    },
  };
}

export default createSlidingLog;
