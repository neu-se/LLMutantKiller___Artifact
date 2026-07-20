// Test to detect the mutation in q.js where the window/self check is replaced with `false`
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library environment detection", () => {
  it("should properly detect browser-like environments", () => {
    // The mutation changes the condition from checking window/self to always false
    // This means the browser-specific initialization code won't run
    // We can detect this by checking if the module has the noConflict method
    // which is only added in browser environments

    // In the original code, noConflict should exist when window/self is defined
    // In the mutated code, it won't exist because the condition is always false
    expect(typeof Q.noConflict).toBe('function');

    // Additionally, test that Q is actually the module we expect
    expect(Q).toBeDefined();
    expect(typeof Q.resolve).toBe('function');
  });
});