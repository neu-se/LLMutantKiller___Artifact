const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should not execute valueOf body for pending promises in original code", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Track if the valueOf function body executes
    let valueOfExecuted = false;
    promise.valueOf = function() {
      valueOfExecuted = true;
      return this;
    };

    // Call valueOf - in original code this should not execute the body
    // because messages exists initially, but in mutated code it will always execute
    promise.valueOf();

    // In original code, valueOf body should NOT execute for pending promises
    // In mutated code, it WILL execute (making the test fail)
    expect(valueOfExecuted).toBe(false);
  });
});