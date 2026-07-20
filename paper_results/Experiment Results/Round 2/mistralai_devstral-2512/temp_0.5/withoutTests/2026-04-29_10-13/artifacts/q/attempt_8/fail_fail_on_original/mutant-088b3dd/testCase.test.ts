const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with function names", () => {
    // Directly test the getFileNameAndLineNumber function by accessing it
    // through the Q module's internal implementation
    const stackLine = "at functionName (filename.js:42:21)";
    const result = Q.getFileNameAndLineNumber(stackLine);

    // The mutation changes the condition from `if (attempt1)` to `if (false)`
    // which will cause this function to return undefined
    expect(result).toEqual(["filename.js", 42]);
  });
});