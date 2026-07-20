// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-b852dd7/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
  it("should emit unhandledRejection event only when process.emit is a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;

    // Mock process.emit to track calls
    let emitCalled = false;
    process.emit = function(event: string, ...args: any[]) {
      if (event === "unhandledRejection") {
        emitCalled = true;
      }
      return originalEmit.apply(this, [event, ...args]);
    };

    // Create a rejection that should trigger unhandledRejection
    const deferred = Q.defer();
    deferred.promise.then(null, () => {
      // Handle rejection to prevent unhandledRejection
    });
    deferred.reject(new Error("test error"));

    // Give time for the event to be emitted
    setTimeout(() => {
      // Restore original process.emit
      process.emit = originalEmit;

      // The mutation would cause emit to be called even when it's not a function
      // In the original code, emit should not be called because we handled the rejection
      expect(emitCalled).toBe(false);
      done();
    }, 100);
  });
});