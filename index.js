import readline from "readline";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import createTokenBucket from "./algorithms/tokenBucket.js";
import createLeakyBucket from "./algorithms/leakyBucket.js";
import createFixedWindow from "./algorithms/fixedWindow.js";
import createSlidingLog from "./algorithms/slidingLog.js";
import createSlidingCounter from "./algorithms/slidingCounter.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const ALGORITHMS = {
  1: { name: "Token Bucket", create: () => createTokenBucket(2, 0.2) },
  2: { name: "Leaky Bucket", create: () => createLeakyBucket(2, 0.2) },
  3: { name: "Fixed Window", create: () => createFixedWindow(2, 10000) },
  4: { name: "Sliding Log", create: () => createSlidingLog(2, 10000) },
  5: { name: "Sliding Counter", create: () => createSlidingCounter(2, 10000) },
};

const outputFile = path.join(__dirname, "output.txt");

function showMenu() {
  console.log("\nRate Limiting Algorithms");
  console.log("1. Token Bucket");
  console.log("2. Leaky Bucket");
  console.log("3. Fixed Window");
  console.log("4. Sliding Log");
  console.log("5. Sliding Counter");
  console.log("6. Exit");
}

function startApp() {
  showMenu();
  rl.question("Choose an algorithm (1-6): ", (choice) => {
    if (choice === "6") {
      console.log("Goodbye!");
      rl.close();
      return;
    }

    if (!ALGORITHMS[choice]) {
      console.log("Invalid choice. Please try again.");
      startApp();
      return;
    }

    const limiter = ALGORITHMS[choice].create();
    const algoName = ALGORITHMS[choice].name;
    console.log(`\nUsing: ${algoName}`);
    console.log("Type something and press Enter to write to output.txt");
    console.log("Rate limit: 2 requests per 10 seconds\n");

    promptUser(limiter, algoName);
  });
}

function promptUser(limiter, algoName) {
  rl.question("Enter text: ", (text) => {
    if (text.toLowerCase() === "back") {
      startApp();
      return;
    }

    if (limiter.allow()) {
      const timestamp = new Date().toISOString();
      const entry = `[${timestamp}] ${text}\n`;
      fs.appendFileSync(outputFile, entry);
      console.log("Written to output.txt");
    } else {
      console.log("Rate limited! Try again later.");
    }

    promptUser(limiter, algoName);
  });
}

console.log("Rate Limiting Demo");
startApp();
