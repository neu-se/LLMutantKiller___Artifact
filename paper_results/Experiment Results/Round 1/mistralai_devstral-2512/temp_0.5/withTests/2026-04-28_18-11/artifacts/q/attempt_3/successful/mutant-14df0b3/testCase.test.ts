// Test case to detect the mutation in Q["delete"] function
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.delete", () => {
  it("should return a promise when deleting a property from an object", () => {
    const obj = { a: 10 };
    const promise = Q["delete"](obj, "a");

    // The original code should return a promise
    expect(typeof promise.then).toBe("function");

    return promise.then(() => {
      // After deletion, the property should be removed
      expect(obj).not.toHaveProperty("a");
    });
  });
});