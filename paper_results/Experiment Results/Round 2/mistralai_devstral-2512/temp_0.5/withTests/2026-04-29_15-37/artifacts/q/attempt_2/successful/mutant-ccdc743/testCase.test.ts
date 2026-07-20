// Test case to detect the mutation in the `finally` method
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("finally method with invalid callback", () => {
  it("should throw an error when callback is not a function", () => {
    const promise = Q.resolve(42);
    const invalidCallback = "not a function";

    // This should throw an error in the original code but not in the mutated code
    expect(() => {
      promise.finally(invalidCallback);
    }).toThrow("Q can't apply finally callback");
  });
});