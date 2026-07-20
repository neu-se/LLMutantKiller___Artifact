describe("array_indexOf fallback", () => {
  it("finds element at correct index without native indexOf", () => {
    const originalIndexOf = Array.prototype.indexOf;
    // @ts-ignore  
    delete Array.prototype.indexOf;
    
    jest.resetModules();
    const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
    Array.prototype.indexOf = originalIndexOf;
    
    // Use Q.resetUnhandledRejections which calls array_indexOf via untrackRejection
    // Create a rejection and immediately handle it synchronously via .fail()
    // The untracking happens in nextTick - we need to verify the result
    
    Q.resetUnhandledRejections();
    const r = Q.reject("reason1");
    // Handling triggers untrackRejection -> array_indexOf on the unhandledRejections array
    r.fail(() => {});
    
    return Q.delay(100).then(() => {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
}, 1000);