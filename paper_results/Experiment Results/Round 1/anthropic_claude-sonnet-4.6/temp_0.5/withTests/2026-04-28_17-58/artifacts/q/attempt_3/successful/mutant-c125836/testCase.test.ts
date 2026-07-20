describe("array_reduce shim dispatches all queued messages", () => {
  it("dispatches the first queued message when a deferred promise is resolved", (done) => {
    // Remove Array.prototype.reduce before loading Q so the internal shim is used
    const originalReduce = Array.prototype.reduce;
    // @ts-ignore
    delete Array.prototype.reduce;

    let QModule: any;
    try {
      // Clear require cache so Q re-evaluates and captures the shim
      const qPath = require.resolve("../../../../../../../../../../../subject_repositories/q/q.js");
      delete require.cache[qPath];
      QModule = require("../../../../../../../../../../../subject_repositories/q/q.js");
    } finally {
      Array.prototype.reduce = originalReduce;
    }

    // With the ORIGINAL code: array_reduce(messages, cb, void 0)
    //   arguments.length === 3, so (arguments.length === 1) is false,
    //   skips seeking, loops from index 0, cb(messages[0]) is called -> handler fires.
    //
    // With the MUTATED code: if (true) always seeks first element as basis,
    //   sets basis = messages[0], index = 1, then loops from index 1.
    //   With only one message, nothing is iterated -> cb never called -> handler never fires.

    const deferred = QModule.defer();

    // Attach handler BEFORE resolving so the message gets queued
    deferred.promise.then(
      (value: number) => {
        expect(value).toBe(42);
        done();
      },
      (err: any) => {
        done(new Error("Unexpected rejection: " + err));
      }
    );

    // Resolving triggers become() -> array_reduce(messages, cb, void 0)
    deferred.resolve(42);
  }, 3000);
});