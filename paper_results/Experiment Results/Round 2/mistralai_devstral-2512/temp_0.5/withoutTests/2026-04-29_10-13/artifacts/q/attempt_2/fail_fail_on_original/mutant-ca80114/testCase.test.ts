import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise error handling", () => {
  it("should handle errors differently in Node.js vs browser environments", async () => {
    // Create a rejected promise
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Track whether the error was thrown synchronously (Node.js behavior)
    // or asynchronously (browser behavior)
    let errorThrownSynchronously = false;
    let errorThrownAsynchronously = false;

    // In the original code (isNodeJS check), errors in Node.js should be thrown synchronously
    // In the mutated code (always true), errors will always be thrown synchronously
    try {
      await rejectedPromise;
    } catch (e) {
      // This should not be reached in the original Node.js behavior
      // because the error should have been thrown synchronously
      errorThrownAsynchronously = true;
    }

    // Give a tick for any async error throwing
    await Q.delay(10);

    // In the original code with isNodeJS=true, the error should have been thrown synchronously
    // In the mutated code, it will always be thrown synchronously
    // We can't directly observe the synchronous throw, but we can check that
    // the async catch wasn't triggered
    expect(errorThrownAsynchronously).toBe(false);
  });
});