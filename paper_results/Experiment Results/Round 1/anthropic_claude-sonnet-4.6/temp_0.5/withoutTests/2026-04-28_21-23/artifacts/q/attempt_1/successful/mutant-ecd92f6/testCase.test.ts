import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise inspect with undefined inspect function", () => {
  it("should return state 'unknown' when inspect is not provided to Promise constructor", () => {
    // Q.master creates a Promise without an inspect function in some paths,
    // but the most direct way to test this is through Q.makePromise (which is Promise)
    // When inspect is undefined, the original code sets a default that returns {state: "unknown"}
    // The mutated code leaves inspect as undefined, causing inspect() to throw or return undefined
    
    const descriptor = {
      "when": function() { return 42; }
    };
    
    // Create a promise without providing an inspect function (third argument is undefined)
    const p = Q.makePromise(descriptor, undefined, undefined);
    
    // In the original code, inspect defaults to returning {state: "unknown"}
    // In the mutated code, inspect is undefined, so calling p.inspect() would throw
    const result = p.inspect();
    
    expect(result).toEqual({ state: "unknown" });
  });
});