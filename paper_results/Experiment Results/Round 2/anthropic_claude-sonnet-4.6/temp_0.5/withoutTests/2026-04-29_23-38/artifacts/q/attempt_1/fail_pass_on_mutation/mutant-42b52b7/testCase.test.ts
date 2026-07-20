import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when the rejection is handled", async () => {
    // Reset state
    Q.resetUnhandledRejections();
    
    // Create a rejected promise - this adds to unhandledRejections
    const error = new Error("test rejection");
    const rejectedPromise = Q.reject(error);
    
    // At this point, the rejection should be tracked
    // Now handle the rejection - this should call untrackRejection
    const handledPromise = rejectedPromise.then(null, function(err) {
      // handled
      return "handled";
    });
    
    // Wait for the promise chain to settle
    await handledPromise;
    
    // Give the nextTick queue time to flush
    await new Promise(resolve => setImmediate(resolve));
    await new Promise(resolve => setImmediate(resolve));
    
    // After handling, the unhandled reasons should be empty
    // In original code: untrackRejection removes it from the arrays
    // In mutated code: the splice doesn't happen (condition is inverted), so it stays
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});