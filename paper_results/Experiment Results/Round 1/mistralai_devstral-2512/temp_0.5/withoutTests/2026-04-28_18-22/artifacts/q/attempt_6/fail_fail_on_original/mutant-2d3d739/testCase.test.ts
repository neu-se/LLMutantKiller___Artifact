const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should properly define properties when long stack traces are enabled", () => {
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

    // Check that the promise has stack property
    // In the original code, this should be defined via object_defineProperty
    // In the mutated code, this will fail because object_defineProperty is false
    expect(promise).toHaveProperty("stack");
    expect(typeof promise.stack).toBe("string");
    expect(promise.stack.length).toBeGreaterThan(0);

    // Restore environment
    process.env.Q_DEBUG = originalEnv;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
  });
});