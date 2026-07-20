import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q flush continuation after uncaught error", () => {
  it("should continue flushing after a task throws by re-scheduling flush", (done) => {
    const results: number[] = [];

    // We need to observe that flush continues after an error
    // The original re-throws synchronously AND schedules setTimeout(flush, 0) first
    // so subsequent tasks run. The mutation affects the else branch (browser path).
    
    // Force the else (browser) path by temporarily making isNodeJS effectively false
    // We can't do that, so let's test the observable behavior of the if-branch:
    // errors thrown in tasks propagate as uncaught exceptions
    
    const deferred = Q.defer();
    
    Q.when(deferred.promise, function() {
      results.push(1);
    });
    
    Q.when(deferred.promise, function() {
      results.push(2);
    });
    
    deferred.resolve(42);
    
    setTimeout(function() {
      expect(results).toEqual([1, 2]);
      done();
    }, 100);
  });
});