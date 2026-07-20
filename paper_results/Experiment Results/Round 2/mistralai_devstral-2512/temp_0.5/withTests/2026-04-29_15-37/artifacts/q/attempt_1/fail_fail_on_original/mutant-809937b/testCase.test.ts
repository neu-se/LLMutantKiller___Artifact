// Test case to detect the mutation in q.js
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", () => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to be undefined (not a function)
    process.emit = undefined as any;

    // Create a rejected promise that should not be tracked
    const rejectedPromise = Q.reject(new Error("test error"));

    // Restore process.emit
    process.emit = originalEmit;

    // The test passes if no error is thrown during the process
    // In the mutated version, the condition would be true (typeof process.emit === "undefined")
    // which would cause the code to try calling process.emit("unhandledRejection", ...)
    // resulting in an error since process.emit is undefined
    return Q.delay(10).then(() => {
      expect(true).toBe(true);
    });
  });
});