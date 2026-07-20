import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q nextTick mechanism", () => {
  it("should flush the promise queue without throwing when MessageChannel is available", (done) => {
    // In the mutated code, when MessageChannel is defined (Node.js 15+),
    // requestTick is left undefined, causing an uncaught TypeError when called.
    // We catch this by checking that a simple promise chain resolves correctly
    // within a reasonable number of event loop ticks.
    
    let resolved = false;
    
    // Set up an error handler to catch any uncaught exceptions from nextTick
    const originalUncaughtHandler = process.listeners("uncaughtException").slice();
    const errors: Error[] = [];
    
    const uncaughtHandler = (err: Error) => {
      errors.push(err);
    };
    process.on("uncaughtException", uncaughtHandler);
    
    const deferred = Q.defer();
    deferred.promise.then(() => {
      resolved = true;
    });
    
    deferred.resolve(1);
    
    // Give enough time for the promise to resolve (or fail)
    setTimeout(() => {
      process.removeListener("uncaughtException", uncaughtHandler);
      
      // In the mutated code, requestTick() throws TypeError (not a function)
      // In the original code, no errors and resolved === true
      expect(errors.length).toBe(0);
      expect(resolved).toBe(true);
      done();
    }, 100);
  });
});