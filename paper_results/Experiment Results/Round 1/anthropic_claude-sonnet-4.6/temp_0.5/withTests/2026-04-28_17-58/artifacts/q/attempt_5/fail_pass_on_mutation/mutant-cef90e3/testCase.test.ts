import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should not override fulfillment with rejection when rejection handler fires after fulfillment", () => {
    const innerDeferred = Q.defer();
    innerDeferred.resolve(42);

    // Patch promiseDispatch to also call the rejection operand after fulfillment
    const originalDispatch = (innerDeferred.promise as any).promiseDispatch;
    (innerDeferred.promise as any).promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      originalDispatch.call(innerDeferred.promise, resolve, op, operands);
      if (op === "when" && operands && operands[1]) {
        Q.nextTick(function() {
          operands[1](new Error("spurious rejection"));
        });
      }
    };

    const callLog: string[] = [];

    return innerDeferred.promise.then(
      function(value: any) {
        callLog.push("fulfilled:" + value);
      },
      function() {
        callLog.push("rejected");
      }
    ).then(function() {
      expect(callLog).toEqual(["fulfilled:42"]);
    });
  });
});