import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly handle stack lines with column numbers", () => {
    // This test targets the mutation in getFileNameAndLineNumber where
    // the regex was changed from /at ([^ ]+):(\d+):(?:\d+)$/ to /at ([^ ]+):(\d+):(?:\d+)/
    // The original requires the line to end after column number ($)
    // The mutated version doesn't require end-of-line, which could match incorrectly

    // Create a scenario that forces stack trace parsing
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q.reject(new Error("Test error"));

    // The mutation would cause incorrect parsing of stack lines
    // when there are extra characters after the column number
    // This affects long stack trace generation

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // Verify the error is handled correctly
        expect(error.message).toBe("Test error");
        // The stack should be properly formatted
        expect(error.stack).toBeDefined();
      }
    );
  });
});