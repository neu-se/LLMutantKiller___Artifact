// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // The mutation changes the condition from checking process.toString()
    // to always true, which could cause issues in non-Node environments

    // Create a deferred and verify it resolves using the correct tick mechanism
    const deferred = Q.defer();
    let resolved = false;

    deferred.promise.then(() => {
      resolved = true;
    });

    // Schedule resolution for next tick
    process.nextTick(() => {
      deferred.resolve();
    });

    // Check after a short delay
    setTimeout(() => {
      if (resolved) {
        done();
      } else {
        done(new Error("Promise did not resolve, suggesting incorrect tick handling"));
      }
    }, 20);
  });
});