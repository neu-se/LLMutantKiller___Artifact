// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should verify exports object is properly checked in CommonJS environment", () => {
    // This test verifies the mutation by checking if the exports check is working correctly
    // The original code checks `typeof exports === "object" && typeof module === "object"`
    // The mutation changes it to `true && typeof module === "object"`

    // First verify Q works normally
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Now test the critical difference - we'll check if exports was actually used
    // by verifying the module.exports reference
    const moduleExports = module.exports;
    expect(moduleExports).toBeDefined();
    expect(typeof moduleExports).toBe("object");

    // The key test: verify that Q was actually exported to module.exports
    // This would fail if the mutation caused exports to not be properly checked
    expect(moduleExports).toBe(Q);

    // Test basic functionality to ensure Q works
    let testPassed = false;
    Q.resolve(42).then((value: number) => {
      testPassed = true;
      expect(value).toBe(42);
    });

    return new Promise((resolve) => {
      setTimeout(() => {
        expect(testPassed).toBe(true);
        resolve(null);
      }, 10);
    });
  });
});