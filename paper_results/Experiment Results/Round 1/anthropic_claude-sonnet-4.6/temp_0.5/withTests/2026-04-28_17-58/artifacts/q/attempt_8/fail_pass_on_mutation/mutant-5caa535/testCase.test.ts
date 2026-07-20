describe("Q array_indexOf fallback off-by-one", () => {
  it("does not find undefined in array of promises when using fallback indexOf", () => {
    jest.resetModules();
    const origIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = origIndexOf;
    
    // The fallback array_indexOf is now active in Q
    // Test: create a rejection, handle it, then create another
    // The key: after handling, unhandledRejections should be empty
    // If array_indexOf incorrectly returns 0 for empty array + undefined search,
    // it could cause spurious behavior
    
    Q.resetUnhandledRejections();
    
    // Create rejection p1 and handle it immediately
    const p1 = Q.reject(new Error("e1"));
    p1.fail(() => {});
    
    // Now create p2 but don't handle it
    const p2 = Q.reject(new Error("e2"));
    
    // After async operations, p2 should be the only unhandled rejection
    return Q.delay(100).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(1);
    });
  });
});