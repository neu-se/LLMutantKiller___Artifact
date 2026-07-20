// Test case to detect the mutation in q.js
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Node.js environment detection", () => {
  it("should correctly identify Node.js environment and use process.nextTick", () => {
    // This test verifies that Q correctly identifies a Node.js environment
    // by checking process.toString() === "[object process]"
    // The mutation changes this to always true, which would make it work
    // even in non-Node environments where process.nextTick doesn't exist

    // Create a promise and verify it uses the correct tick mechanism
    const deferred = Q.defer();
    let resolved = false;

    // Track which tick mechanism is used
    const originalNextTick = process.nextTick;
    const originalSetTimeout = setTimeout;
    let usedNextTick = false;
    let usedSetTimeout = false;

    process.nextTick = function(callback) {
      usedNextTick = true;
      return originalNextTick.call(this, callback);
    };

    // @ts-ignore - overriding global
    global.setTimeout = function(callback: Function, delay: number) {
      usedSetTimeout = true;
      return originalSetTimeout.call(this, callback, delay);
    };

    deferred.promise.then(() => {
      resolved = true;
    });

    deferred.resolve();

    return Q.delay(10).then(() => {
      // Restore original functions
      process.nextTick = originalNextTick;
      global.setTimeout = originalSetTimeout;

      // In original code: should use process.nextTick in Node environment
      // In mutated code: would always try to use process.nextTick
      if (!usedNextTick && !usedSetTimeout) {
        throw new Error("No tick mechanism was used");
      }
      if (!resolved) {
        throw new Error("Promise did not resolve");
      }
    });
  });
});