import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should resolve with fulfilled value and ignore subsequent rejection when a misbehaving thenable calls both onFulfilled and onRejected", () => {
    // A thenable that calls both onFulfilled and onRejected
    const misbehavingThenable = {
      then: function(onFulfilled: (v: any) => void, onRejected: (e: any) => void) {
        onFulfilled(42);
        onRejected(new Error("should be ignored due to done guard"));
      }
    };

    const results: Array<{ type: string; value?: any; reason?: any }> = [];

    return Q(misbehavingThenable)
      .then(
        function(value: any) {
          results.push({ type: "fulfilled", value });
        },
        function(reason: any) {
          results.push({ type: "rejected", reason });
        }
      )
      .then(function() {
        expect(results.length).toBe(1);
        expect(results[0].type).toBe("fulfilled");
        expect(results[0].value).toBe(42);
      });
  });
});