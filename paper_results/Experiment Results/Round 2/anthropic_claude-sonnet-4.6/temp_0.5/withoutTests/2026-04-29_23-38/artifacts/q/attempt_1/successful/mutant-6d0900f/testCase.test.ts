import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("untrackRejection behavior", () => {
  it("should remove a rejection from unhandled reasons when it is handled", async () => {
    Q.resetUnhandledRejections();
    
    const deferred = Q.defer();
    const error = new Error("test error");
    
    // Create a rejected promise and handle it
    const handledPromise = deferred.promise.then(
      null,
      function(err) {
        // rejection is handled here
        return "handled";
      }
    );
    
    deferred.reject(error);
    
    // Wait for the promise chain to settle
    await handledPromise;
    
    // Give Q's async machinery time to process
    await new Promise(resolve => setTimeout(resolve, 50));
    
    // With original code, the rejection should be untracked (removed from unhandled list)
    // With mutated code, it stays in the list because untrackRejection always returns early
    const unhandledReasons = Q.getUnhandledReasons();
    expect(unhandledReasons.length).toBe(0);
  });
});