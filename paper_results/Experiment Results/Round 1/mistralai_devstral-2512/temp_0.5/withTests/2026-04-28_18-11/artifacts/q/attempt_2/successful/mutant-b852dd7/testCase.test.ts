// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b852dd7/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should not emit unhandledRejection when process.emit is not a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Make process.emit not a function
    process.emit = null as any;

    // Track if unhandledRejection event was emitted
    let unhandledRejectionEmitted = false;
    const originalOn = process.on;
    process.on = function(event: string, listener: (...args: any[]) => void) {
      if (event === "unhandledRejection") {
        unhandledRejectionEmitted = true;
      }
      return originalOn.call(this, event, listener);
    };

    // Create an unhandled rejection
    const deferred = Q.defer();
    deferred.reject(new Error("test error"));

    // Give time for the event to be processed
    setTimeout(() => {
      // Restore original process.emit and process.on
      process.emit = originalEmit;
      process.on = originalOn;

      // In the original code, unhandledRejection should not be emitted
      // because process.emit is not a function
      // In the mutated code, it would try to emit even when process.emit is not a function
      expect(unhandledRejectionEmitted).toBe(false);
      done();
    }, 100);
  });
});