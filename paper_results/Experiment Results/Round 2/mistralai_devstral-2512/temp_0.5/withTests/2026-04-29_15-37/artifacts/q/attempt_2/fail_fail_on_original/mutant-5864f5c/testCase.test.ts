// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-5864f5c/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation test", () => {
  it("should correctly identify StopIteration exceptions in async generator context", () => {
    // Create a mock generator that throws StopIteration
    const mockGenerator = {
      next: () => {
        const stopIteration = { toString: () => "[object StopIteration]" };
        throw stopIteration;
      }
    };

    // Create a mock generator that throws a normal error
    const mockErrorGenerator = {
      next: () => {
        throw new Error("normal error");
      }
    };

    // Test with StopIteration - should be caught and handled
    const promise1 = Q.async(function* () {
      try {
        yield mockGenerator.next();
      } catch (e) {
        // This should catch the StopIteration and return its value
        if (Q.isStopIteration(e)) {
          return "stopped";
        }
        throw e;
      }
    })();

    // Test with normal error - should propagate
    const promise2 = Q.async(function* () {
      try {
        yield mockErrorGenerator.next();
      } catch (e) {
        if (Q.isStopIteration(e)) {
          return "stopped";
        }
        throw e;
      }
    })();

    return Promise.all([
      promise1.then(result => {
        expect(result).toBe("stopped");
      }),
      promise2.then(
        () => {
          throw new Error("Should have rejected");
        },
        (error) => {
          expect(error.message).toBe("normal error");
        }
      )
    ]);
  });
});