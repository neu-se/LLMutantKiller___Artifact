import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should not track spurious unhandled rejections when rejection handler is called twice", () => {
    Q.resetUnhandledRejections();

    // Create a promise that calls its rejection operand twice
    const innerDeferred = Q.defer();
    innerDeferred.reject(new Error("original error"));

    const origDispatch = (innerDeferred.promise as any).promiseDispatch;
    (innerDeferred.promise as any).promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      origDispatch.call(innerDeferred.promise, resolve, op, operands);
      // Call the rejection operand a second time
      if (op === "when" && operands && operands[1]) {
        operands[1](new Error("duplicate rejection"));
      }
    };

    const p = innerDeferred.promise.then(
      function(value: any) { return value; },
      function(reason: any) { return reason; } // handle the rejection
    );

    return p.then(function() {
      // With original code: second call to rejection handler returns early (done guard)
      // so _rejected is NOT called again, no extra unhandled rejection tracked
      // With mutated code: second call proceeds to _rejected(), tracking an unhandled rejection
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});