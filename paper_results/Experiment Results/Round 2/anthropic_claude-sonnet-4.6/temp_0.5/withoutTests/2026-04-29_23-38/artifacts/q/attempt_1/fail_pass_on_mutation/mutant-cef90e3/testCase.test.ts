import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then - done flag prevents double resolution", () => {
  it("should not call rejected callback after fulfilled callback has been called", async () => {
    // Create a misbehaving thenable that calls both resolve and reject
    const misbehavingThenable = {
      then: function(onFulfilled: (v: any) => void, onRejected: (e: any) => void) {
        onFulfilled(42);
        // Also call onRejected - the done flag should prevent this from having effect
        onRejected(new Error("should be ignored"));
      }
    };

    const results: any[] = [];
    
    const promise = Q(misbehavingThenable).then(
      function(value) {
        results.push({ type: "fulfilled", value });
        return value;
      },
      function(reason) {
        results.push({ type: "rejected", reason });
        return reason;
      }
    );

    const finalValue = await promise;
    
    // Should only have fulfilled result, not rejected
    expect(results).toHaveLength(1);
    expect(results[0].type).toBe("fulfilled");
    expect(results[0].value).toBe(42);
    expect(finalValue).toBe(42);
  });
});