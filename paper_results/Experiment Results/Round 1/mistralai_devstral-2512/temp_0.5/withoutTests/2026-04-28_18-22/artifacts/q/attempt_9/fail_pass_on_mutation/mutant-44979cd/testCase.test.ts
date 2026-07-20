// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly export Q in CommonJS environment", () => {
    // This test verifies that Q is properly exported in a CommonJS environment
    // The mutation changes the condition from checking `typeof exports === "object"`
    // to just `true`, which could affect module loading behavior

    // Verify Q is defined and is a function
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify it has the expected properties
    expect(Q.defer).toBeDefined();
    expect(Q.resolve).toBeDefined();
    expect(Q.reject).toBeDefined();

    // Test basic promise functionality
    let testValue = 0;
    return Q.resolve(42).then((value: number) => {
      testValue = value;
      expect(testValue).toBe(42);
    });
  });
});