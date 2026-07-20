// Test case to detect the mutation in Q.fbind
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.fbind behavior", () => {
  it("should return a function that applies arguments correctly", () => {
    const testFn = function(a: number, b: number): number {
      return a + b;
    };

    const boundFn = Q.fbind(testFn, 1);
    const result = boundFn(2);

    return result.then((value: number) => {
      expect(value).toBe(3);
    });
  });
});