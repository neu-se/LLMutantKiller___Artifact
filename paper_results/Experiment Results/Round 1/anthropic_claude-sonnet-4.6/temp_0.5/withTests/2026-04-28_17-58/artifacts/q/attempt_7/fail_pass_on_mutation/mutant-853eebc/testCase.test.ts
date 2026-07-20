import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf in untrackRejection", () => {
  it("should remove rejection from unhandled reasons after it is handled", () => {
    Q.resetUnhandledRejections();
    
    const err = new Error("test");
    const p = Q.reject(err);
    
    // Handle the rejection - this should call untrackRejection
    p.then(null, function() {});
    
    return Q.delay(50).then(function() {
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});