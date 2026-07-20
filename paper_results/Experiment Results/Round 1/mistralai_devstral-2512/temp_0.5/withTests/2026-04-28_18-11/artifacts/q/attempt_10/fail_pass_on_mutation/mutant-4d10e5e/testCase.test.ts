const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("hasStacks mutation test", () => {
  it("should not capture line information when hasStacks is false", () => {
    // Store the original value of qStartingLine
    const originalQStartingLine = Q.qStartingLine;

    // Create a deferred promise which would trigger captureLine() if hasStacks is true
    const deferred = Q.defer();

    // With hasStacks=false, qStartingLine should remain undefined
    // With hasStacks=true, it would be set to a line number
    expect(Q.qStartingLine).toBeUndefined();

    // Clean up
    deferred.resolve();

    // Restore original value
    Q.qStartingLine = originalQStartingLine;
  });
});