import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.then progress handler", () => {
  it("should not call deferred.notify when the progress callback throws", (done) => {
    const deferred = Q.defer();
    const notifiedValues: any[] = [];
    
    // Set up Q.onerror to suppress the thrown error from the progress handler
    const originalOnerror = Q.onerror;
    Q.onerror = () => {}; // suppress errors
    
    deferred.promise.then(
      null,
      null,
      function progressHandler(value: any) {
        // This progress handler throws an exception
        throw new Error("progress error");
      }
    ).then(
      null,
      null,
      function(value: any) {
        notifiedValues.push(value);
      }
    );
    
    // Send a progress notification
    deferred.notify("test-progress");
    
    // Wait for async processing
    setTimeout(() => {
      Q.onerror = originalOnerror;
      
      // In the original code: threw=true, so notify is NOT called, notifiedValues should be empty
      // In the mutated code: always calls notify, so notifiedValues would have a value
      expect(notifiedValues).toHaveLength(0);
      done();
    }, 100);
  });
});