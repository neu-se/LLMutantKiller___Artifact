// Test case to detect the mutation in the unhandled rejection tracking logic
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Unhandled rejection tracking", () => {
  it("should only emit unhandledRejection when process.emit is a function", (done) => {
    // Save the original process.emit
    const originalEmit = process.emit;

    // Test case 1: When process.emit is NOT a function
    process.emit = undefined as any;
    let test1Failed = false;

    try {
      const rejectedPromise1 = Q.reject(new Error("Test error 1"));
      setTimeout(() => {
        // Should not throw if process.emit is not a function
        done();
      }, 50);
    } catch (e) {
      test1Failed = true;
    }

    // Test case 2: When process.emit IS a function
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        // This should only be called when process.emit is a function
        done();
      }
      return true;
    } as any;

    const rejectedPromise2 = Q.reject(new Error("Test error 2"));

    // Restore original process.emit
    process.emit = originalEmit;
  });
});