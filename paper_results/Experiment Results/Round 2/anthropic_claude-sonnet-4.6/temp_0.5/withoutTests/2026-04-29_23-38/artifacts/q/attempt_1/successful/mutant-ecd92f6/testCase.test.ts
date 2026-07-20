import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect fallback", () => {
  it("should return state 'unknown' when inspect is not provided to Promise constructor", () => {
    // Q.master creates a Promise without an inspect function initially,
    // but we can test directly by creating a promise via Q.makePromise
    // without providing an inspect function.
    // The mutation removes the default inspect function assignment,
    // so calling inspect() on such a promise would throw or return undefined.
    
    // Create a promise using Q.makePromise (which is the Promise constructor)
    // without providing an inspect function (third argument)
    const descriptor = {
      "when": function() { return 42; }
    };
    const fallback = function(op: string) {
      return Q.reject(new Error("unsupported operation: " + op));
    };
    
    // Don't pass inspect - this triggers the default inspect path
    const p = Q.makePromise(descriptor, fallback);
    
    // In the original code, inspect defaults to returning {state: "unknown"}
    // In the mutated code, inspect remains undefined, so calling p.inspect() would throw
    const result = p.inspect();
    expect(result).toEqual({ state: "unknown" });
  });
});