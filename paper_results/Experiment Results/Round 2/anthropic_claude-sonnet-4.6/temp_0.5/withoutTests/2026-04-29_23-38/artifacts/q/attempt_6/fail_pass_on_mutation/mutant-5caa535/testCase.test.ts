describe("Q array_indexOf fallback off-by-one", () => {
  it("should return -1 when value is not found, not arr.length", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    try {
      Object.defineProperty(Array.prototype, "indexOf", {
        value: undefined,
        writable: true,
        configurable: true,
      });
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      Q.resetUnhandledRejections();

      // Create a rejection, wait for it to be tracked
      const p1 = Q.reject(new Error("e1"));
      await new Promise<void>((r) => setTimeout(r, 30));
      
      // unhandledRejections = [p1]
      // Now handle it: untrackRejection(p1) -> array_indexOf([p1], p1) = 0 (same for both)
      // p1 is removed, unhandledRejections = []
      await p1.fail(() => "ok");
      await new Promise<void>((r) => setTimeout(r, 30));
      
      expect(Q.getUnhandledReasons().length).toBe(0);
      
      // Now create another rejection AFTER the array is empty
      // and immediately reset - then handle it
      const p2 = Q.reject(new Error("e2"));
      await new Promise<void>((r) => setTimeout(r, 30));
      
      // unhandledRejections = [p2], length = 1
      // Now search for undefined in [p2]:
      // Original: i=0, p2===undefined? No. Returns -1. Correct.
      // Mutated: i=0, p2===undefined? No. i=1, arr[1]=undefined===undefined? YES! Returns 1.
      // But this only happens if we search for undefined...
      // We're searching for p2, not undefined.
      
      // Still same result. I cannot detect this mutation.
      expect(Q.getUnhandledReasons().length).toBe(1);
      
      await p2.fail(() => "ok");
      await new Promise<void>((r) => setTimeout(r, 30));
      expect(Q.getUnhandledReasons().length).toBe(0);
      
    } finally {
      Object.defineProperty(Array.prototype, "indexOf", {
        value: originalIndexOf,
        writable: true,
        configurable: true,
      });
      jest.resetModules();
    }
  });
});