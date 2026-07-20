import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise constructor with no inspect argument", () => {
  it("should return a promise with a working inspect method when no inspect function is provided", () => {
    // Q.makePromise is the Promise constructor
    // When called without an inspect argument, the original code sets a default
    // inspect that returns {state: "unknown"}
    // The mutation changes `if (inspect === void 0)` to `if (false)`,
    // so the default is never set, leaving inspect as undefined
    const promise = Q.makePromise({
      when: function() { return 42; }
    });

    // In the original code, promise.inspect() returns {state: "unknown"}
    // In the mutated code, promise.inspect is undefined, so calling it throws
    expect(() => promise.inspect()).not.toThrow();
    expect(promise.inspect()).toEqual({ state: "unknown" });
  });
});