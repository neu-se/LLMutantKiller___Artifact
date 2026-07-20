import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("progress mutation detection", () => {
  it("should not call deferred.notify when progress callback throws, so downstream gets no undefined notification", (done) => {
    const outer = Q.defer();
    Q.onerror = function() {};

    const received: unknown[] = [];

    // .then() returns a new promise backed by an inner deferred
    // When outer notifies, the progress handler runs, throws, 
    // and in mutated code calls inner deferred.notify(undefined)
    const inner = outer.promise.then(
      function(v: unknown) { return v; },
      null,
      function(v: unknown) {
        throw new Error("throws!");
      }
    );

    // Attach progress listener directly to inner deferred's promise
    inner.progress(function(val: unknown) {
      received.push(val);
    });

    outer.notify(42);

    setTimeout(function() {
      outer.resolve(1);
      setTimeout(function() {
        // Original: received === [] (threw, so no notify)
        // Mutated:  received === [undefined] (always notifies)
        expect(received.length).toBe(0);
        Q.onerror = null;
        done();
      }, 100);
    }, 100);
  });
});