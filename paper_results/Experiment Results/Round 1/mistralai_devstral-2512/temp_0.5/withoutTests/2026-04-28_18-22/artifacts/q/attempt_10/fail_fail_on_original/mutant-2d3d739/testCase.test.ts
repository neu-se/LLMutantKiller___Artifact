const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should properly define stack property using object_defineProperty", () => {
    // Enable long stack support which uses object_defineProperty
    const originalEnv = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Force reloading of Q to pick up the environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithLongStacks = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const deferred = QWithLongStacks.defer();
    const promise = deferred.promise;

    // Trigger rejection to create stack trace
    deferred.reject(new Error("test error"));

    // Check if the promise has stack property defined
    // In the original code, object_defineProperty is used to define this
    // In the mutated code, object_defineProperty is false, so this will fail
    const hasStack = 'stack' in promise;
    expect(hasStack).toBe(true);

    if (hasStack) {
      expect(typeof promise.stack).toBe('string');
      expect(promise.stack.length).toBeGreaterThan(0);
    }

    // Restore environment
    process.env.Q_DEBUG = originalEnv;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
  });
});