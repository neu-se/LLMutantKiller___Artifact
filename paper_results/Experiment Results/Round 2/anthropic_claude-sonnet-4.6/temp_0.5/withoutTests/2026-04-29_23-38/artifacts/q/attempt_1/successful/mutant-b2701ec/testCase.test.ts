import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor default inspect", () => {
  it("should provide a default inspect function when none is provided", () => {
    // Q.makePromise is the Promise constructor
    // When called without an inspect argument, it should default to returning {state: "unknown"}
    const promise = Q.makePromise(
      {
        "when": function() { return 42; }
      },
      function fallback() { return this; }
      // no inspect argument - should use default
    );

    // In the original code, inspect defaults to () => ({state: "unknown"})
    // In the mutated code, inspect stays undefined, so promise.inspect would be undefined
    expect(typeof promise.inspect).toBe("function");
    expect(promise.inspect()).toEqual({ state: "unknown" });
  });
});