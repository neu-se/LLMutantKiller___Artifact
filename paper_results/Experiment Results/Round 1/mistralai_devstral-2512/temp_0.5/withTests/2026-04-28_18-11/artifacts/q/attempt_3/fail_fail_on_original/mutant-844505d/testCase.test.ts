// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_3/pending_category/mutant-844505d/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done domain handling", () => {
  it("should use process.domain when available for error handling", (done) => {
    // This test verifies that the original code checks for process.domain
    // The mutated code changes this check to `if (false)`, which would prevent domain binding

    // Create a mock domain with minimal required methods
    const mockDomain = {
      bind: jest.fn((fn: any) => fn),
      enter: jest.fn(),
      exit: jest.fn()
    };

    // Store original process.domain
    const originalDomain = (process as any).domain;

    // Temporarily set mock domain
    (process as any).domain = mockDomain;

    const deferred = Q.defer();
    let testCompleted = false;

    Q.onerror = function(error: any) {
      if (testCompleted) return;
      testCompleted = true;

      // Verify that domain.bind was called (proving the domain check worked)
      expect(mockDomain.bind).toHaveBeenCalled();

      // Restore original domain
      (process as any).domain = originalDomain;
      done();
    };

    // Set timeout to fail test if not completed
    setTimeout(() => {
      if (!testCompleted) {
        (process as any).domain = originalDomain;
        done(new Error("Test timed out - domain binding not verified"));
      }
    }, 100);

    // Trigger error handling path
    deferred.promise.done();
    deferred.reject(new Error("test error"));
  });
});