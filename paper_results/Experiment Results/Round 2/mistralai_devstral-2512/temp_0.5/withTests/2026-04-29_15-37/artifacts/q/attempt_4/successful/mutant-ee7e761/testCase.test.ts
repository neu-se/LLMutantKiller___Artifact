// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.delete", () => {
  it("should correctly call the delete method on promise objects", () => {
    const obj = { test: "value" };
    const promise = Q(obj);

    // Verify the method exists and is callable
    expect(typeof promise["delete"]).toBe("function");

    // Test the actual functionality
    return promise["delete"]("test").then((result: any) => {
      expect(result).toBeUndefined();
      expect(obj).not.toHaveProperty("test");
    });
  });
});