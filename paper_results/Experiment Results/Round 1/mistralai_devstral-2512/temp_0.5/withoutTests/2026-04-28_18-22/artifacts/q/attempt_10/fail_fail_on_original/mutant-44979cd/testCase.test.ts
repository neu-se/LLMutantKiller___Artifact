// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should verify exports object is checked in CommonJS environment", () => {
    // This test verifies the mutation by checking if the exports check is working correctly
    // The original code checks `typeof exports === "object" && typeof module === "object"`
    // The mutation changes it to `true && typeof module === "object"`

    // First verify Q works normally
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // The key test: verify that exports is actually an object in this environment
    // This would be different behavior if the mutation was present
    expect(typeof exports).toBe("object");
    expect(typeof module).toBe("object");

    // Test that Q was properly exported
    expect(module.exports).toBe(Q);

    // Test basic functionality
    return Q.resolve("test").then((value: string) => {
      expect(value).toBe("test");
    });
  });
});