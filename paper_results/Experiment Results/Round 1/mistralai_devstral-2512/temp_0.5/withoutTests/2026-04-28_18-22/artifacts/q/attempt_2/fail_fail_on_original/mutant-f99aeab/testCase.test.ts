import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace handling", () => {
  it("should not capture stack traces when hasStacks is false", () => {
    // Create a promise that would normally capture stack traces
    const deferred = Q.defer();

    // Force the environment to appear as if it doesn't support stacks
    const originalStack = Error.prepareStackTrace;
    Error.prepareStackTrace = undefined;

    // Create a promise that would trigger stack capture
    const promise = deferred.promise.then(() => {
      return Q.resolve(42);
    });

    // Restore original stack handling
    Error.prepareStackTrace = originalStack;

    // The promise should not have a stack property when hasStacks is false
    expect(promise.stack).toBeUndefined();
  });
});