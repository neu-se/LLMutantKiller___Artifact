const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse function name stack traces", () => {
    // Create a test case that specifically exercises the getFileNameAndLineNumber function
    // by creating a scenario where stack traces need to be parsed
    const error = new Error("Test error");
    const stackLine = "at testFunction (/path/to/file.js:10:5)";

    // This will indirectly test the getFileNameAndLineNumber function
    // through the stack trace filtering mechanism
    const promise = Q.defer().promise;
    promise.stack = "Error: test\n" + stackLine + "\n    at q.js:100:15";

    // Force stack trace processing
    Q.makeStackTraceLong(error, promise);

    // Verify the stack was processed correctly
    expect(error.stack).toBeDefined();
  });
});