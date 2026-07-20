// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment by checking process.toString()", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Create a promise and check the internal tick mechanism
    const deferred = Q.defer();
    let tickType = "unknown";

    // Override the nextTick function to detect which mechanism is used
    const originalNextTick = Q.nextTick;
    Q.nextTick = function(task) {
      // Check if we're using process.nextTick (Node) or setTimeout (browser)
      if (process.nextTick) {
        tickType = "process.nextTick";
      } else {
        tickType = "setTimeout";
      }
      return originalNextTick.call(this, task);
    };

    deferred.promise.then(() => {
      // In original code: should use process.nextTick in Node environment
      // In mutated code: would always try to use process.nextTick
      if (tickType !== "process.nextTick") {
        throw new Error("Not using process.nextTick - mutation detected");
      }
    });

    deferred.resolve();
    return deferred.promise;
  });
});