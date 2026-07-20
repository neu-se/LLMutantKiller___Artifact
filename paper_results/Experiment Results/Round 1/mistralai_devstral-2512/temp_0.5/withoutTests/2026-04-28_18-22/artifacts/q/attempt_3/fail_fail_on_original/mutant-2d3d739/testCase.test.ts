const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should properly define properties on objects when Q.longStackSupport is enabled", () => {
    // Enable long stack support which uses object_defineProperty
    const originalEnv = process.env.Q_DEBUG;
    process.env.Q_DEBUG = "1";

    // Force reloading of Q to pick up the environment variable
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
    const QWithLongStacks = require("../../../../../../../../../../../subject_repositories/q/q.js");

    const deferred = QWithLongStacks.defer();
    const promise = deferred.promise;

    // Trigger the code path that uses object_defineProperty
    deferred.reject(new Error("test error"));

    // Check that the promise has the expected properties defined
    expect(promise).toHaveProperty("stack");
    expect(promise).toHaveProperty("stackCounter");
    expect(typeof promise.stack).toBe("string");
    expect(typeof promise.stackCounter).toBe("number");

    // Restore environment
    process.env.Q_DEBUG = originalEnv;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
  });
});