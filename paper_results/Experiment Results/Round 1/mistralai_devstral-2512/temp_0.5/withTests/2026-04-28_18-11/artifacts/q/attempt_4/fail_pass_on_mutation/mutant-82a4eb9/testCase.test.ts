// Test to detect the mutation in q.js
const q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q module export behavior", () => {
  it("should correctly handle module exports in Node.js environment", () => {
    // This test verifies that Q is properly exported in a Node.js environment
    // The mutation changes the condition from AND to OR which could cause
    // the module to be exported incorrectly when only one of exports/module is an object

    // Verify Q is properly exported
    expect(q).toBeDefined();
    expect(typeof q).toBe('function');

    // Test that Q can create and resolve promises
    const promise = q.resolve(42);
    expect(promise).toBeDefined();
    expect(typeof promise.then).toBe('function');

    // Test promise functionality
    return promise.then((value: number) => {
      expect(value).toBe(42);
      return q(10); // Test Q as a function
    }).then((val: number) => {
      expect(val).toBe(10);
    });
  });
});