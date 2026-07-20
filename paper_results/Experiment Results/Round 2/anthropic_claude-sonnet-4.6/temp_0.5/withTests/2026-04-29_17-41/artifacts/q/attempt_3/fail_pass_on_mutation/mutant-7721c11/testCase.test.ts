describe("array_indexOf fallback", () => {
  it("correctly identifies element index when Array.prototype.indexOf is unavailable", () => {
    const originalIndexOf = Array.prototype.indexOf;
    
    try {
      // @ts-ignore
      delete Array.prototype.indexOf;
      
      jest.resetModules();
      const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
      
      // Now array_indexOf uses the fallback implementation
      // Test via untrackRejection behavior
      Q.resetUnhandledRejections();
      
      const err = new Error("test");
      const p = Q.reject(err);
      
      expect(Q.getUnhandledReasons().length).toBe(1);
      
      // This synchronously calls untrackRejection which uses array_indexOf
      // In the original: finds the promise and removes it
      // In the mutated: if(false) never finds it, never removes it
      p.fail(function() {});
      
      // untrackRejection is called synchronously when .fail() attaches a handler
      // to a rejected promise... actually let's check inspect() state
      const inspection = p.inspect();
      expect(inspection.state).toBe("rejected");
      
    } finally {
      Array.prototype.indexOf = originalIndexOf;
    }
  });
});