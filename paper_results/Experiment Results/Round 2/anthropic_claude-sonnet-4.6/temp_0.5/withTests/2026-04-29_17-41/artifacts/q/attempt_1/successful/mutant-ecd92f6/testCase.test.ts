import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with no inspect argument", () => {
  it("should provide a default inspect function returning state 'unknown' when inspect is not provided", () => {
    // Q.makePromise is the Promise constructor
    // When called without an inspect argument, the original code provides a default
    // inspect function that returns { state: "unknown" }
    // The mutated code leaves inspect as undefined, causing promise.inspect to be undefined
    const promise = Q.makePromise({
      "when": function() { return 42; }
    });

    // In the original code, inspect defaults to a function returning { state: "unknown" }
    // In the mutated code, inspect is undefined, so promise.inspect is undefined
    expect(typeof promise.inspect).toBe("function");
    expect(promise.inspect()).toEqual({ state: "unknown" });
  });
});