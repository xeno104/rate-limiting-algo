# Rate Limiting Algorithms

A small Node.js project that implements five rate limiting algorithms and lets you try them from the terminal. Pick an algorithm from the menu and start typing — anything you type while the limit allows is appended to `output.txt` with a timestamp.

## How to Run

There are no dependencies to install — you only need Node.js installed, since the project only uses the standard library.

```bash
node index.js
```

Then choose an algorithm from 1 to 5, type any text and press Enter. Type `back` to return to the menu and `6` to exit. Every algorithm here is set to allow 2 requests per 10 seconds.

## Features

| # | Algorithm | How it works |
| - | --------- | ------------ |
| 1 | Token Bucket | Tokens refill at a fixed rate and each request spends one. Allows short bursts. |
| 2 | Leaky Bucket | Requests fill a bucket that drains at a fixed rate. Gives a smoother, steadier output. |
| 3 | Fixed Window | Counts requests in fixed blocks of time and resets when the block ends. |
| 4 | Sliding Log | Keeps the exact timestamp of every request and drops the ones that fall outside the window. |
| 5 | Sliding Counter | Approximates the sliding window using only two counters, which is much cheaper on memory. |

Each algorithm lives in its own file and exposes the same `allow()` function, so they can be swapped or compared directly.

## Project Structure

```
rate-limiting-algo/
├── index.js                 # menu and terminal loop
├── algorithms/
│   ├── tokenBucket.js
│   ├── leakyBucket.js
│   ├── fixedWindow.js
│   ├── slidingLog.js
│   └── slidingCounter.js
└── output.txt               # accepted requests with timestamps
```