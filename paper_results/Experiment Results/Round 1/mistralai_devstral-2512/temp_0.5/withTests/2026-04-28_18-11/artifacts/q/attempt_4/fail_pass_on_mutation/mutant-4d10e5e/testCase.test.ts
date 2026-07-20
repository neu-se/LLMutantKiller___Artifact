const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not capture stack traces during promise creation when hasStacks is false", () => {
    // Store the original value of hasStacks
    const originalHasStacks = Q.hasStacks;

    // Create a deferred promise
    const deferred = Q.defer();

    // With hasStacks=false, the promise should not have stack properties
    // With hasStacks=true, the promise will have stack properties added
    const promise = deferred.promise;

    // Check if the promise has stack-related properties
    // These properties are only added when hasStacks is true
    const hasStackProperty = 'stack' in promise;
    const hasSourceProperty = 'source' in promise;

    // With original code (hasStacks=false), these should be false
    // With mutated code (hasStacks=true), these will be true
    expect(hasStackProperty).toBe(false);
    expect(hasSourceProperty).toBe(false);

    // Clean up
    deferred.resolve();
  });
});