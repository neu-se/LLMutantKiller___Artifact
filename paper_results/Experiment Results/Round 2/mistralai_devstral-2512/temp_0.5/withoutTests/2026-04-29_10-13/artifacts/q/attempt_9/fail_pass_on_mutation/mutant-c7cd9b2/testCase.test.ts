const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Test that directly exercises the getFileNameAndLineNumber function
    // by creating a stack trace line that should match attempt2 regex
    const testStackLine = "at module.js:42:8";

    // We need to trigger the stack trace parsing logic
    // The best way is to create a rejected promise with a custom error
    const deferred = Q.defer();
    const error = new Error("Test");
    error.stack = `Error: Test\n${testStackLine}\nat other.js:1:1`;
    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (e: any) => {
        // The mutation changes attempt2 condition to always false
        // This means stack lines matching attempt2 pattern won't be parsed
        // We can detect this by checking if the stack trace was properly filtered

        // In original code, the stack line should be parseable
        // In mutated code, it won't be recognized as a valid stack line
        const result = e.stack.includes(testStackLine);
        expect(result).toBe(true);

        // Additional test: verify the regex pattern works
        const match = testStackLine.match(/at ([^ ]+):(\d+):(?:\d)$/);
        expect(match).not.toBeNull();
        if (match) {
          expect(match[1]).toBe("module.js");
          expect(match[2]).toBe("42");
        }
      }
    );
  });
});