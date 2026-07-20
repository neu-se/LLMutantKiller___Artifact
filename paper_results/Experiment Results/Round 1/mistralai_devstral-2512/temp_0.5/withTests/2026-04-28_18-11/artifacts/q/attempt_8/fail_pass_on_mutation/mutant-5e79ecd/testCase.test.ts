// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5e79ecd/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("done method behavior", () => {
  it("should handle promise with all three callbacks correctly", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;
    let fulfilledCalled = false;
    let rejectedCalled = false;
    let progressValue: number | null = null;

    // Set up all three callbacks
    promise.done(
      (value: string) => {
        fulfilledCalled = true;
        expect(value).toBe("test value");
      },
      (error: Error) => {
        rejectedCalled = true;
        expect(false).toBe(true); // Should not be called
      },
      (value: number) => {
        progressValue = value;
      }
    );

    // Notify progress and then resolve
    deferred.notify(42);
    deferred.resolve("test value");

    // Verify the correct callbacks were called
    return Q.delay(10).then(() => {
      expect(fulfilledCalled).toBe(true);
      expect(rejectedCalled).toBe(false);
      expect(progressValue).toBe(42);
    });
  });
});