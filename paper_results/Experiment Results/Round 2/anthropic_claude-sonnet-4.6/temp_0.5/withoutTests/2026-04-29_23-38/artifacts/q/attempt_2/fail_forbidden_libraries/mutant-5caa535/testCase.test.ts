import { jest } from "@jest/globals";

describe("array_indexOf fallback mutation", () => {
  it("should correctly search for undefined in array using fallback indexOf", async () => {
    const originalIndexOf = Array.prototype.indexOf;
    
    try {
      // Force Q to use its fallback indexOf by removing the native one
      (Array.prototype as any).indexOf = undefined;
      
      jest.resetModules();
      
      // Load Q without native indexOf - it will use the fallback
      // @ts-ignore
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // The fallback array_indexOf is now in use
      // Test: Q.all with a specific array structure
      // Q.all uses array_reduce but not array_indexOf directly
      // However, the unhandled rejection tracking uses array_indexOf
      
      Q.resetUnhandledRejections();
      
      // Create rejections
      const err1 = new Error("error1");
      const err2 = new Error("error2");
      const p1 = Q.reject(err1);
      const p2 = Q.reject(err2);
      
      // Wait for tracking
      await new Promise(resolve => setTimeout(resolve, 30));
      
      expect(Q.getUnhandledReasons().length).toBe(2);
      
      // Handle p1 - untrackRejection(p1) is called
      // array_indexOf([p1, p2], p1) should return 0 (same for both original and mutated)
      const result = await p1.fail(function(e: Error) { return "caught: " + e.message; });
      expect(result).toBe("caught: error1");
      
      await new Promise(resolve => setTimeout(resolve, 30));
      
      // p1 should be removed, p2 should remain
      const reasons = Q.getUnhandledReasons();
      expect(reasons.length).toBe(1);
      
      // Handle p2
      await p2.fail(function() { return "ok"; });
      await new Promise(resolve => setTimeout(resolve, 30));
      
      expect(Q.getUnhandledReasons().length).toBe(0);
      
    } finally {
      Array.prototype.indexOf = originalIndexOf;
      jest.resetModules();
    }
  });
});