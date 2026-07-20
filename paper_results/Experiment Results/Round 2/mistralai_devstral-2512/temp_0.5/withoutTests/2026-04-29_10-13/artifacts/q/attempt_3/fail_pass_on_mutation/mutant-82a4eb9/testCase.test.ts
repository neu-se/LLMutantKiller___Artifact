// Test to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export detection", () => {
  it("should correctly export Q when both exports and module are objects", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from AND to OR, which could cause
    // incorrect behavior when only one of exports or module is an object
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Test basic promise functionality to ensure Q works correctly
    const promise = Q.resolve(42);
    return promise.then((value: number) => {
      expect(value).toBe(42);
    });
  });
});