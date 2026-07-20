describe("Q array_indexOf fallback", () => {
  it("Q.any with all rejections correctly rejects with fallback indexOf", async () => {
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
      
      let caughtError: any = null;
      await Q.any([Q.reject(new Error("only"))]).fail((e: any) => {
        caughtError = e;
        return "caught";
      });
      
      expect(caughtError).not.toBeNull();
      expect(caughtError.message).toContain("Q can't get fulfillment value from any promise");
      
      Q.resetUnhandledRejections();
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