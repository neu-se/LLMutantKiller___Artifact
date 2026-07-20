// Test case to detect the mutation in the `finally` method
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("finally callback validation", () => {
  it("should throw an error when callback is not a function", () => {
    const promise = Q.resolve(42);
    const invalidCallback = "not a function";

    // This should throw an error in the original code but not in the mutated version
    expect(() => {
      promise.finally(invalidCallback);
    }).toThrow("Q can't apply finally callback");
  });
});