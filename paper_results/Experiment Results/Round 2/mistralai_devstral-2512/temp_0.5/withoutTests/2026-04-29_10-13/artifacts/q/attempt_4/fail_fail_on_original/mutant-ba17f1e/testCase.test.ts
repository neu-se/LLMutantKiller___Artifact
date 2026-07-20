const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse file names and line numbers from stack traces", () => {
    // This test directly exercises the stack trace parsing functionality
    // by creating a scenario where stack traces are filtered
    Q.longStackSupport = true;

    let stackTraceParsedCorrectly = false;

    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // The mutation affects getFileNameAndLineNumber which is used in isInternalFrame
    // This in turn affects filterStackString which is used in makeStackTraceLong
    return promise.then(
      () => {
        throw new Error("Should not be called");
      },
      (reason: Error) => {
        // Check if the stack trace was properly processed
        // The mutation would cause getFileNameAndLineNumber to return []
        // which would break the stack trace filtering
        if (reason.stack && reason.stack.includes("From previous event:")) {
          stackTraceParsedCorrectly = true;
        }
        expect(stackTraceParsedCorrectly).toBe(true);
      }
    );
  });
});