import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate availability check", () => {
  it("should correctly detect when setImmediate is not available", () => {
    // Save the original setImmediate if it exists
    const originalSetImmediate = global.setImmediate;

    // Simulate an environment where setImmediate is not a function
    global.setImmediate = undefined;

    // Track whether setTimeout was called as fallback
    let setTimeoutCalled = false;
    const originalSetTimeout = global.setTimeout;
    global.setTimeout = function(fn: Function, delay: number) {
      setTimeoutCalled = true;
      return originalSetTimeout(fn, delay);
    };

    // Create and resolve a promise to trigger the async mechanism
    const promise = Q.resolve();
    let promiseResolved = false;

    promise.then(() => {
      promiseResolved = true;
    });

    // Restore original functions
    global.setImmediate = originalSetImmediate;
    global.setTimeout = originalSetTimeout;

    // The test passes if setTimeout was called as fallback
    // (which means the original code correctly detected setImmediate was unavailable)
    // The mutated code would incorrectly try to use setImmediate even when it's not available
    expect(setTimeoutCalled).toBe(true);
    expect(promiseResolved).toBe(true);
  });
});