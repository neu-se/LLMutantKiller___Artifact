describe("Q array_indexOf fallback off-by-one", () => {
  it("detects mutation: fallback indexOf should not access arr[arr.length]", async () => {
    // Clean up any previous getter
    try { delete (Array.prototype as any)[0]; } catch (e) {}
    
    const originalIndexOf = Array.prototype.indexOf;
    const rejectionHandledEvents: any[] = [];
    const rejectionHandledHandler = (...args: any[]) => {
      rejectionHandledEvents.push(args);
    };
    
    let testPromise: any;
    
    try {
      // Force Q to use its fallback indexOf
      Object.defineProperty(Array.prototype, "indexOf", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      Q.resetUnhandledRejections();
      
      // Create rejection and wait for it to be tracked and reported
      testPromise = Q.reject(new Error("test"));
      await new Promise<void>((r) => setTimeout(r, 100));
      
      // Reset tracking (clears unhandledRejections = [])
      Q.resetUnhandledRejections();
      
      // Set getter WITH setter to avoid breaking Array.push
      // For empty arrays: arr[0] returns testPromise (getter)
      // When arr[0] is written: creates own property (setter)
      // For non-empty arrays: own property takes precedence over getter
      Object.defineProperty(Array.prototype, "0", {
        get: function() {
          return testPromise;
        },
        set: function(value: any) {
          Object.defineProperty(this, "0", {
            value: value,
            writable: true,
            enumerable: true,
            configurable: true,
          });
        },
        configurable: true,
      });
      
      process.on("rejectionHandled", rejectionHandledHandler);
      
      // Handle testPromise - triggers untrackRejection(testPromise)
      // unhandledRejections = [] (after reset)
      // array_indexOf([], testPromise):
      //   Original: loop condition 0 < 0 is false. Returns -1. Nothing happens.
      //   Mutated: loop condition 0 <= 0 is true. arr[0] via getter = testPromise.
      //            testPromise === testPromise? YES! Returns 0.
      //            Enters if block. Schedules runAfter that emits rejectionHandled.
      await testPromise.fail(() => "ok");
      await new Promise<void>((r) => setTimeout(r, 150));
      
      // Original: no rejectionHandled events
      // Mutated: rejectionHandled event emitted
      expect(rejectionHandledEvents.length).toBe(0);
      
    } finally {
      process.removeListener("rejectionHandled", rejectionHandledHandler);
      try { delete (Array.prototype as any)[0]; } catch (e) {}
      Object.defineProperty(Array.prototype, "indexOf", {
        value: originalIndexOf,
        writable: true,
        configurable: true,
      });
      jest.resetModules();
    }
  });
});