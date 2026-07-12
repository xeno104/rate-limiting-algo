function createLeakyBucket(capacity, leakRate) {
  let water = 0;
  let lastLeak = Date.now();

  function leak() {
    const now = Date.now();
    const elapsed = (now - lastLeak) / 1000;
    water = Math.max(0, water - elapsed * leakRate);
    lastLeak = now;
  }

  return {
    allow() {
      leak();
      if (water < capacity) {
        water += 1;
        return true;
      }
      return false;
    },
  };
}

export default createLeakyBucket;
