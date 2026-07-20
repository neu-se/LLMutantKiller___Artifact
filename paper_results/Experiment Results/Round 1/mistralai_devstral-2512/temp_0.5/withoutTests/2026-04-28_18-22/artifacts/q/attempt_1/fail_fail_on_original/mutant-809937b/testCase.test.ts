// Test case to detect the mutation in q.js
import { Q } from "./q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined
    process.emit = undefined;

    // Create a rejected promise that should not be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // Give some time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore the original process.emit
      process.emit = originalEmit;

      // The test passes if no error is thrown (no unhandledRejection event was emitted)
      done();
    }, 100);
  });
});