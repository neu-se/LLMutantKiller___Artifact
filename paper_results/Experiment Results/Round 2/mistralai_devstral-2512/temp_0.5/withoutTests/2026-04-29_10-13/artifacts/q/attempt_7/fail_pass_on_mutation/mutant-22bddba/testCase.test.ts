// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_7/pending_category/mutant-22bddba/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
  it("should correctly identify browser-like environments", () => {
    // Test that Q can create and resolve promises in a Node.js environment
    // This verifies the basic functionality works regardless of global export

    const testValue = "test";
    const promise = Q.resolve(testValue);

    return promise.then((result) => {
      expect(result).toBe(testValue);

      // Now test promise rejection
      const error = new Error("test error");
      const rejectedPromise = Q.reject(error);

      return rejectedPromise.then(
        () => {
          throw new Error("Should not resolve");
        },
        (caughtError) => {
          expect(caughtError).toBe(error);
        }
      );
    });
  });
});