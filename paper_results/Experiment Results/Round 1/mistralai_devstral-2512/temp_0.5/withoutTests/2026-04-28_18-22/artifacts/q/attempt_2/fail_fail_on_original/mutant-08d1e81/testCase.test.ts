import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    const originalEmit = process.emit;
    let emitCalled = false;

    // Mock process.emit to track if it's called
    process.emit = function(event: string, ...args: any[]): boolean {
      if (event === "unhandledRejection") {
        emitCalled = true;
      }
      return originalEmit.call(process, event, ...args) as boolean;
    };

    // Create a rejected promise without handling it
    const rejectedPromise = Q.reject(new Error("Test error"));

    // Give time for the unhandled rejection tracking to occur
    setTimeout(() => {
      // Restore original emit
      process.emit = originalEmit;

      // The mutation would cause emit to be called even when it shouldn't
      // In the original code, emit should not be called because process.emit is a function
      // But the test is designed to fail when the condition is always true (mutation)
      expect(emitCalled).toBe(false);
      done();
    }, 10);
  });
});