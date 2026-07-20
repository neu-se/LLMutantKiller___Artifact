// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-844505d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done domain handling", () => {
  it("should bind onUnhandledError to process.domain when available", (done) => {
    // This test verifies that the original code checks for process.domain
    // The mutated code changes this check to `if (false)`, which would break domain binding
    const originalDomain = process.domain;
    const mockDomain = {
      bind: jest.fn((fn: any) => fn)
    };

    // Mock process.domain by creating a new process object
    const mockProcess = {
      ...process,
      domain: mockDomain
    };

    // Replace global process temporarily
    (global as any).process = mockProcess;

    const deferred = Q.defer();
    let errorHandled = false;

    Q.onerror = function(error: any) {
      errorHandled = true;
      expect(mockDomain.bind).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("test error");

      // Restore original process
      (global as any).process = process;
      done();
    };

    Q.delay(10).then(() => {
      if (!errorHandled) {
        (global as any).process = process;
        done(new Error("Test timed out - error was not handled"));
      }
    });

    deferred.promise.done();
    deferred.reject(new Error("test error"));
  });
});