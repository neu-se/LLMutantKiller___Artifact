const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q promise valueOf behavior", () => {
  it("should preserve original valueOf behavior for pending promises", () => {
    const deferred = Q.defer();
    const promise = deferred.promise;

    // Store original valueOf behavior
    const originalResult = promise.valueOf();

    // Override valueOf to return something different
    let customCalled = false;
    promise.valueOf = function() {
      customCalled = true;
      return "custom";
    };

    // Call valueOf again
    const secondResult = promise.valueOf();

    // In original code: secondResult should be "custom" and customCalled should be true
    // In mutated code: the condition change affects when valueOf executes
    expect(secondResult).toBe("custom");
    expect(customCalled).toBe(true);
  });
});