// Test case to detect the mutation in isStopIteration function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration exception
    const stopIteration = { toString: () => "[object StopIteration]" };
    const normalError = new Error("Normal error");

    // Test with a generator that throws StopIteration
    const testGenerator = Q.async(function* () {
      throw stopIteration;
      yield "should not reach here";
    });

    // The promise should reject with the StopIteration exception
    return testGenerator()
      .then(
        () => {
          throw new Error("Promise should have been rejected");
        },
        (error) => {
          // In the original code, this should be treated as a StopIteration
          // In the mutated code, it will be treated differently
          expect(error).toBe(stopIteration);
        }
      );
  });
});