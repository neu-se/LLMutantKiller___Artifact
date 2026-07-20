import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("array_indexOf fallback behavior", () => {
  it("should complete rejection tracking operations without hanging", async () => {
    // The mutation changes i++ to i-- in the array_indexOf fallback,
    // causing an infinite loop. We test that operations using array_indexOf
    // complete correctly and within a finite time.
    Q.resetUnhandledRejections();
    
    const reason = new Error("test rejection");
    const rejected = Q.reject(reason);
    
    // untrackRejection uses array_indexOf internally
    // If the fallback has i--, it would loop infinitely
    const result = await rejected.then(null, function(err) {
      return "handled: " + err.message;
    });
    
    expect(result).toBe("handled: test rejection");
    expect(Q.getUnhandledReasons().length).toBe(0);
  });
});