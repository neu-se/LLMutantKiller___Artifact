import Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Promise.prototype.then done guard", () => {
  it("should not create unhandled rejection when notify is called after promise fulfills", () => {
    Q.resetUnhandledRejections();
    
    const deferred = Q.defer();
    
    // Attach .then - this registers operands[1] (rejection handler) as progress listener
    const p = deferred.promise.then(
      function(v: any) { return v; }
      // no rejection handler - so _rejected creates an unhandled rejection
    );
    
    // Resolve the deferred
    deferred.resolve(42);
    
    // Wait for fulfillment to process (nextTick), then notify
    return p.then(function() {
      // At this point done=true in the then closure
      // Now notify - this calls the rejection handler (stored as progress listener)
      // Original: if (done) { return; } - returns early, no _rejected called
      // Mutated: if (done) {} - falls through, calls _rejected(42), tracks unhandled rejection
      deferred.notify(99);
      
      // Check no unhandled rejections were created
      expect(Q.getUnhandledReasons().length).toBe(0);
    });
  });
});