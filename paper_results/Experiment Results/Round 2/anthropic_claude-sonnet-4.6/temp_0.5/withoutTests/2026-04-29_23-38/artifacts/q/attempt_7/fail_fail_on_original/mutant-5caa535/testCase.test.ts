describe("Q array_indexOf fallback off-by-one", () => {
  it("detects mutation: fallback indexOf should not access arr[arr.length]", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    const rejectionHandledEvents: any[] = [];
    const handler = (...args: any[]) => { rejectionHandledEvents.push(args); };
    
    let p3: any;
    
    try {
      // Remove native indexOf to force Q's fallback
      Object.defineProperty(Array.prototype, "indexOf", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      
      // Add getter for index 0 on Array.prototype
      // This makes arr[0] return p3 when arr is empty (no own property 0)
      Object.defineProperty(Array.prototype, "0", {
        get: function() {
          // Only return p3 for empty arrays (no own property)
          // For non-empty arrays, own properties take precedence
          if (p3 !== undefined) return p3;
          return undefined;
        },
        configurable: true,
      });
      
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      Q.resetUnhandledRejections();
      
      // Create rejection p3 and wait for it to be tracked
      p3 = Q.reject(new Error("test"));
      await new Promise<void>((r) => setTimeout(r, 50));
      
      // Reset tracking (clears unhandledRejections = [])
      Q.resetUnhandledRejections();
      
      // Listen for rejectionHandled events
      process.on("rejectionHandled", handler);
      
      // Handle p3 - triggers untrackRejection(p3)
      // unhandledRejections is now [] (after reset)
      // array_indexOf([], p3):
      //   Original: loop doesn't run (0 < 0 is false). Returns -1. Nothing happens.
      //   Mutated: loop runs once (0 <= 0 is true). arr[0] via getter = p3. p3===p3? YES! Returns 0.
      //     Enters if block. May emit rejectionHandled.
      await p3.fail(() => "ok");
      await new Promise<void>((r) => setTimeout(r, 100));
      
      // Original: no rejectionHandled events (at = -1, condition false)
      // Mutated: may have rejectionHandled events (at = 0, condition true)
      expect(rejectionHandledEvents.length).toBe(0);
      
    } finally {
      process.removeListener("rejectionHandled", handler);
      // Remove the getter
      delete (Array.prototype as any)[0];
      Object.defineProperty(Array.prototype, "indexOf", {
        value: originalIndexOf,
        writable: true,
        configurable: true,
      });
      jest.resetModules();
    }
  });
});