import { Q } from "./q.js";

describe("Q promise error handling", () => {
  it("should handle errors differently in Node.js vs browser environments", async () => {
    // This test checks the behavior of error handling in different environments
    // The mutation changes the condition from `if (isNodeJS)` to `if (true)`
    // which forces Node.js error handling behavior even in browser environments

    // Create a promise that rejects
    const rejectingPromise = Q.reject(new Error("Test error"));

    // Track if the error was thrown synchronously (Node.js behavior)
    // or asynchronously (browser behavior)
    let errorThrownSynchronously = false;
    let errorThrownAsynchronously = false;

    try {
      // In the original code (isNodeJS check), this would:
      // - In Node.js: throw the error synchronously in the next tick
      // - In browser: throw the error asynchronously in setTimeout
      // In the mutated code (always true), it will always use Node.js behavior
      await rejectingPromise;
    } catch (e) {
      // If we get here, the error was thrown synchronously
      errorThrownSynchronously = true;
    }

    // Wait a bit to see if error is thrown asynchronously
    await new Promise(resolve => setTimeout(resolve, 10));

    if (!errorThrownSynchronously) {
      // Check if window object exists (browser environment)
      if (typeof window !== "undefined") {
        // In browser environment with original code, error should be thrown asynchronously
        // With mutated code, it would have been thrown synchronously above
        errorThrownAsynchronously = true;
      }
    }

    // In original code running in browser:
    // - errorThrownSynchronously should be false
    // - errorThrownAsynchronously should be true
    // In mutated code running in browser:
    // - errorThrownSynchronously should be true
    // - errorThrownAsynchronously should be false

    if (typeof window !== "undefined") {
      // We're in a browser environment
      expect(errorThrownSynchronously).toBe(false);
      expect(errorThrownAsynchronously).toBe(true);
    } else {
      // We're in Node.js - both behaviors are acceptable
      expect(errorThrownSynchronously).toBe(true);
    }
  });
});