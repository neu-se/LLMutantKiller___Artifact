import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should not create spurious unhandled rejections when rejection handler fires after done is set", () => {
    Q.resetUnhandledRejections();

    // Create a promise that calls both the resolve callback AND the rejection operand
    // We need the rejection operand to fire after the fulfilled path has set done=true
    const innerDeferred = Q.defer();
    
    // Patch to call rejection operand synchronously after fulfilled dispatch
    const origDispatch = (innerDeferred.promise as any).promiseDispatch;
    let capturedRejectionHandler: ((e: any) => void) | null = null;
    
    (innerDeferred.promise as any).promiseDispatch = function(resolve: any, op: string, operands: any[]) {
      if (op === "when" && operands && operands[1]) {
        capturedRejectionHandler = operands[1];
      }
      origDispatch.call(innerDeferred.promise, resolve, op, operands);
    };

    innerDeferred.resolve(42);

    const p = innerDeferred.promise.then(
      function(value: any) { return value; },
      function(reason: any) { return reason; }
    );

    return p.then(function() {
      // Now fire the rejection handler after fulfilled has already run
      if (capturedRejectionHandler) {
        capturedRejectionHandler(new Error("spurious"));
      }
      // With mutation: _rejected() is called, creating an unhandled rejection
      // With original: return; prevents _rejected() from being called
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});