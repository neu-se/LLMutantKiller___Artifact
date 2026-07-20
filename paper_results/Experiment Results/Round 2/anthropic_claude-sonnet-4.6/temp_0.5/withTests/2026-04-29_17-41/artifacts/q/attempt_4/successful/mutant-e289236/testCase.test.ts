import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("deferred promise valueOf", () => {
  it("should return the resolved value from valueOf after resolution when messages are cleared", (done) => {
    const deferred = Q.defer();
    deferred.resolve(42);

    Q.nextTick(function () {
      Q.nextTick(function () {
        // After two ticks, the promise should be fully resolved.
        // In original: if (messages) is false after resolution, so valueOf()
        // returns resolvedPromise.valueOf() which gives 42.
        // In mutated: if (true) always returns `promise` itself, not 42.
        const val = (deferred.promise as any).valueOf();
        expect(val).toBe(42);
        done();
      });
    });
  });
});