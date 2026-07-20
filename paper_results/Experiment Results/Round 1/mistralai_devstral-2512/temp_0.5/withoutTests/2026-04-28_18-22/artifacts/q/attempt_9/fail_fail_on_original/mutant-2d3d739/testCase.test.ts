const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library object_defineProperty test", () => {
  it("should use object_defineProperty to define stack properties", () => {
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

    // In the original code, object_defineProperty is used to define the stack property
    // In the mutated code, object_defineProperty is false, so this will throw an error
    let descriptor;
    let errorThrown = false;
    try {
      descriptor = Object.getOwnPropertyDescriptor(promise, 'stack');
    } catch (e) {
      errorThrown = true;
    }

    // In the original code, we should get a descriptor
    // In the mutated code, this will either throw or return undefined
    expect(errorThrown).toBe(false);
    expect(descriptor).toBeDefined();
    expect(descriptor?.configurable).toBe(true);

    // Restore environment
    process.env.Q_DEBUG = originalEnv;
    delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];
  });
});