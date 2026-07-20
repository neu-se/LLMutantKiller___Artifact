describe("Q array_indexOf fallback", () => {
  it("indexOf fallback returns correct index, not out-of-bounds for undefined search", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    try {
      Object.defineProperty(Array.prototype, "indexOf", {
        value: undefined, writable: true, configurable: true
      });
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      Q.resetUnhandledRejections();
      
      // With fallback active, test that Q.any with undefined fulfillment works
      const result = await Q.any([Q(undefined)]);
      expect(result).toBeUndefined();
      
      // The key test: verify unhandled rejection tracking is correct
      // Create rejections, then reset, then handle - checking counts
      const p1 = Q.reject(new Error("e1"));
      await new Promise<void>(r => setTimeout(r, 20));
      expect(Q.getUnhandledReasons().length).toBe(1);
      
      await p1.fail(() => "ok");
      await new Promise<void>(r => setTimeout(r, 20));
      expect(Q.getUnhandledReasons().length).toBe(0);
      
    } finally {
      Object.defineProperty(Array.prototype, "indexOf", {
        value: originalIndexOf, writable: true, configurable: true
      });
      jest.resetModules();
    }
  });
});