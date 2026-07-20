const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace initialization", () => {
  it("should properly detect stack trace support during initialization", () => {
    // The mutation changes the condition from if (!hasStacks) to if (hasStacks)
    // This affects whether qFileName gets set during initialization

    // Create a promise that would trigger stack trace initialization
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Force long stack support to be enabled
    Q.longStackSupport = true;

    // Create a rejected promise to trigger stack capture
    const error = new Error("test");
    const rejected = Q.reject(error);

    // Handle the rejection to prevent unhandled rejection warnings
    let hasStack = false;
    rejected.catch((e: Error) => {
      hasStack = !!e.stack;
    });

    // The original code should properly capture stacks when supported
    // The mutated code would fail to initialize stack support correctly
    expect(hasStack).toBe(true);

    // Clean up
    deferred.resolve(null);
    Q.longStackSupport = false;
  });
});