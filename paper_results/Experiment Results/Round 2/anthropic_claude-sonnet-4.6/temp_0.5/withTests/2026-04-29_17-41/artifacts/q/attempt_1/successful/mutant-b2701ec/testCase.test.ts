import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor default inspect", () => {
  it("should provide a default inspect function returning {state: 'unknown'} when no inspect argument is given", () => {
    // Q.makePromise is the Promise constructor; calling it without an inspect
    // argument should use the default inspect that returns {state: "unknown"}.
    // With the mutation (if (false) instead of if (inspect === void 0)),
    // the default is never assigned and inspect remains undefined, causing
    // promise.inspect() to throw.
    const promise = Q.makePromise(
      {
        when: function() { return 42; }
      },
      function fallback() { return this; }
      // no inspect argument — should default to returning {state: "unknown"}
    );

    const result = promise.inspect();
    expect(result).toEqual({ state: "unknown" });
  });
});