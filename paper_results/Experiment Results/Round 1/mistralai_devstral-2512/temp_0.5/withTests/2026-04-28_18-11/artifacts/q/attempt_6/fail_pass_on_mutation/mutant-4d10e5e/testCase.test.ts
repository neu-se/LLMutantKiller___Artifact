const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not add stack properties to promises when hasStacks is false", () => {
    // Create a simple fulfilled promise
    const promise = Q(42);

    // With hasStacks=false, the promise should not have stack-related properties
    // With hasStacks=true, the promise will have stack properties added during creation
    const hasStack = 'stack' in promise;
    const hasStackCounter = 'stackCounter' in promise;

    // The original code (hasStacks=false) should not add these properties
    // The mutated code (hasStacks=true) will add them
    expect(hasStack).toBe(false);
    expect(hasStackCounter).toBe(false);

    // Also verify the promise still works correctly
    return promise.then(value => {
      expect(value).toBe(42);
    });
  });
});