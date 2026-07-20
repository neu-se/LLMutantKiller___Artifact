// testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace capture", () => {
  it("should correctly set qFileName when hasStacks is true", () => {
    // This test directly targets the mutation in captureLine function
    // The mutation changes `if (!hasStacks)` to `if (hasStacks)`

    // First, verify the environment supports stack traces
    let hasStacks = false;
    try {
      throw new Error();
    } catch (e) {
      hasStacks = !!e.stack;
    }

    if (!hasStacks) {
      // Skip test if environment doesn't support stacks
      expect(true).toBe(true);
      return;
    }

    // Enable long stack traces to trigger captureLine
    Q.longStackSupport = true;

    // Create a deferred promise to trigger stack capture
    const deferred = Q.defer();
    deferred.reject(new Error("Test error"));

    // The promise should have stack information
    const promise = deferred.promise;
    expect(promise.stack).toBeDefined();

    // The stack should contain line number information
    // This verifies that captureLine worked correctly
    expect(promise.stack).toMatch(/:\d+:\d+/);

    // Check that qFileName was set (internal state)
    // This is affected by the mutation
    const qModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    const qFileName = qModule.__qFileName__; // Access internal state if available

    // With the mutation, qFileName won't be set when hasStacks is true
    expect(qFileName).toBeDefined();

    return Q.delay(10);
  });
});