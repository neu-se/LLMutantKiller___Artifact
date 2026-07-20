// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-844505d/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.done domain handling", () => {
  it("should bind onUnhandledError to process.domain when available", (done) => {
    // This test verifies that the original code checks for process.domain
    // The mutated code changes this check to `if (false)`, which would break domain binding
    const originalProcessDomain = process.domain;
    const mockDomain = {
      bind: jest.fn((fn) => fn)
    };

    // Mock process.domain
    (process as any).domain = mockDomain;

    const deferred = Q.defer();
    let errorHandled = false;

    Q.onerror = function(error) {
      errorHandled = true;
      expect(mockDomain.bind).toHaveBeenCalled();
      expect(error).toBeInstanceOf(Error);
      expect(error.message).toBe("test error");

      // Restore original process.domain
      (process as any).domain = originalProcessDomain;
      done();
    };

    Q.delay(10).then(() => {
      if (!errorHandled) {
        (process as any).domain = originalProcessDomain;
        done(new Error("Test timed out - error was not handled"));
      }
    });

    deferred.promise.done();
    deferred.reject(new Error("test error"));
  });
});