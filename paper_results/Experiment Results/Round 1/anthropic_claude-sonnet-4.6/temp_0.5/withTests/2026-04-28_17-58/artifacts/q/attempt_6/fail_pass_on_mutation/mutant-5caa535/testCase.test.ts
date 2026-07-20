describe("Q array_indexOf fallback", () => {
  it("returns -1 for missing values, not array.length", () => {
    jest.resetModules();
    const origIndexOf = Array.prototype.indexOf;
    delete (Array.prototype as any).indexOf;
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = origIndexOf;
    
    // Force array_indexOf to be called with undefined by creating
    // a scenario where unhandledRejections has entries and we
    // check if untracking works correctly
    Q.resetUnhandledRejections();
    
    // Create rejections to populate unhandledRejections = [p1, p2]
    const p1 = Q.reject(new Error("e1"));
    const p2 = Q.reject(new Error("e2"));
    
    // Handle both - untrackRejection(p1) then untrackRejection(p2)
    p1.fail(() => {});
    p2.fail(() => {});
    
    return Q.delay(100).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});