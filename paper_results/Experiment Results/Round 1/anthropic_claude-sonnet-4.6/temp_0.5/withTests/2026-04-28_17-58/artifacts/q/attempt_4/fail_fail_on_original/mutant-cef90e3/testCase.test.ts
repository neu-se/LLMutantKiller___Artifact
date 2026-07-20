import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should resolve with fulfilled value only, ignoring subsequent rejection dispatch", () => {
    // We need a promise whose promiseDispatch calls the resolve callback twice:
    // first with a fulfilled value, then with a rejected value
    // The done guard should prevent the second call from taking effect
    
    const deferred = Q.defer();
    
    // Get access to the internal promise to wrap it
    const originalPromise = deferred.promise;
    
    // Create a wrapper that intercepts promiseDispatch and calls resolve twice
    const wrappedPromise: any = {
      promiseDispatch: function(resolve: any, op: string, operands: any[]) {
        // First dispatch normally (will fulfill)
        originalPromise.promiseDispatch(resolve, op, operands);
        // Then call resolve again with a rejection - should be ignored by done guard
        if (resolve && op === "when") {
          Q.nextTick(function() {
            // Simulate calling the rejection path by calling resolve with a rejected promise
            resolve(Q.reject(new Error("second call should be ignored")));
          });
        }
      },
      inspect: function() { return originalPromise.inspect(); },
      then: (Q as any).Promise.prototype.then,
      fail: (Q as any).Promise.prototype.fail
    };
    
    deferred.resolve(42);
    
    const callLog: Array<{type: string, value?: any}> = [];
    
    return wrappedPromise.then(
      function(value: any) {
        callLog.push({ type: "fulfilled", value });
      },
      function(reason: any) {
        callLog.push({ type: "rejected", value: reason });
      }
    ).then(function() {
      expect(callLog.length).toBe(1);
      expect(callLog[0].type).toBe("fulfilled");
      expect(callLog[0].value).toBe(42);
    });
  });
});