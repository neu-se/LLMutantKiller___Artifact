import { Q } from "./q.js";

describe("Q promise valueOf behavior", () => {
  it("should not call valueOf on pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Override valueOf to track if it's called
    let valueOfCalled = false;
    promise.valueOf = function() {
      valueOfCalled = true;
      return this;
    };

    // Try to use the promise in a context that might trigger valueOf
    // (though in this case it shouldn't for pending promises)
    const result = promise.valueOf();

    // For pending promises, valueOf should not be called in the mutated version
    // because the condition is always true, but in the original version
    // it only executes when messages exists
    expect(valueOfCalled).toBe(false);
  });
});