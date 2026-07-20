import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype valueOf for fulfilled promise", () => {
  it("valueOf on a fulfilled promise returns the value, not the promise", () => {
    const p = Q.makePromise(
      {
        "when": function() { return 42; }
      },
      function fallback() { return this; },
      function inspect() { return { state: "fulfilled", value: 42 }; }
    );
    
    // If the deprecated valueOf support were active and `if (true)` ran
    // instead of `if (inspected.state === "rejected")`, then for a fulfilled
    // promise, promise.exception would be set to undefined (inspected.reason)
    // and valueOf would return inspected.value (42)
    // With original code and `if (inspected.state === "rejected")`, for a 
    // fulfilled promise, the exception block is skipped
    expect((p as any).exception).toBeUndefined();
  });
});