import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("gh-75 style: does not double-resolve when rejection handler fires after fulfillment via misbehaving promise", () => {
    // Create a promise whose promiseDispatch calls resolve TWICE:
    // once via the fulfilled path and once by directly invoking operands[1]
    // We need to do this in a way where done=true for the second call
    
    // The trick: make a promise that synchronously calls both
    // the resolve callback AND operands[1] in the same promiseDispatch call
    // The fulfilled path sets done=true synchronously
    // Then operands[1] fires with done=true
    
    const Q_any = Q as any;
    
    // Create a misbehaving promise using Q's internal Promise constructor
    const misbehaving = Q_any.makePromise({
      "when": function(this: any, rejected: any) {
        // Call the rejection handler directly if it exists
        // This simulates a misbehaving promise
        return 42; // fulfill with 42
      }
    }, undefined, function() {
      return { state: "fulfilled", value: 42 };
    });
    
    // Override promiseDispatch to also call operands[1]
    const origDispatch = misbehaving.promiseDispatch.bind(misbehaving);
    misbehaving.promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      // First do normal dispatch (fulfilled path, sets done=true)
      origDispatch(resolve, op, operands);
      // Then call operands[1] directly (rejection handler, done is now true)
      if (op === "when" && operands && operands[1]) {
        operands[1](new Error("spurious"));
      }
    };
    
    const results: string[] = [];
    
    return Q.when(misbehaving,
      function(v: any) { results.push("fulfilled:" + v); },
      function(e: any) { results.push("rejected"); }
    ).then(function() {
      expect(results).toEqual(["fulfilled:42"]);
    });
  });
});