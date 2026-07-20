// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should properly export Q when exports object exists", () => {
    // This test verifies that Q is properly exported when exports object exists
    // The mutation changes the condition from checking `typeof exports === "object"`
    // to just `true`, which would make it work even when exports doesn't exist

    // Verify Q is defined and is a function
    expect(Q).toBeDefined();
    expect(typeof Q).toBe("function");

    // Verify it has the expected properties
    expect(Q.defer).toBeDefined();
    expect(Q.resolve).toBeDefined();
    expect(Q.reject).toBeDefined();

    // Test basic functionality
    let testPassed = false;
    Q.resolve("test").then((value: string) => {
      testPassed = true;
      expect(value).toBe("test");
    });

    // Give time for promise to resolve
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(testPassed).toBe(true);
        resolve(null);
      }, 10);
    });
  });
});