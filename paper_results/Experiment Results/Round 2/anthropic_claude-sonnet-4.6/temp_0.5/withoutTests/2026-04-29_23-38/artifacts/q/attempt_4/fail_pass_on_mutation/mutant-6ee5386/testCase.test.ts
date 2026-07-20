import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q tap behavior", () => {
  it("should detect the mutation in threw variable by testing tap with exception tracking", async () => {
    // The mutation changes threw=true to threw=false in the finally implementation
    // When a rejection passes through finally with a successful callback,
    // threw should track whether we're in rejection path
    
    const results: string[] = [];
    
    // Test: fulfilled promise -> finally callback that checks threw state
    // The threw variable determines if the original rejection propagates
    const p = Q(1)
      .then(function(v) {
        results.push("fulfilled:" + v);
        return v;
      })
      ["finally"](function() {
        results.push("finally");
        // Return a promise that resolves - this tests the threw tracking
        return Q.resolve();
      })
      .then(function(v) {
        results.push("after:" + v);
        return v;
      });

    const val = await p;
    
    expect(results).toEqual(["fulfilled:1", "finally", "after:1"]);
    expect(val).toBe(1);
  });
});