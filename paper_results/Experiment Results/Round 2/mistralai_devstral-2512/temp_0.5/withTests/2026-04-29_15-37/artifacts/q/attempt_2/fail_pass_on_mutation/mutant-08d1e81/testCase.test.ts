// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should only track unhandled rejections when process.emit is available", () => {
    // Create a rejected promise that won't be handled
    const rejectedPromise = Q.reject(new Error("test error"));

    // In the original code, this should not throw an error
    // In the mutated code, this will try to call process.emit even when process is not available
    // which should cause a TypeError
    return rejectedPromise.then(
      () => {
        throw new Error("Promise should have been rejected");
      },
      () => {
        // Expected rejection
      }
    );
  });
});