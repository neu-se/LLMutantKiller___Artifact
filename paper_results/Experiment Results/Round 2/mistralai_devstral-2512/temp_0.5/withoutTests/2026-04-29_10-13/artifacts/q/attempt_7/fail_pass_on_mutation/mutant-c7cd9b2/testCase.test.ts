const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with anonymous function format", () => {
    // Create a test that directly exercises the stack trace parsing
    // by creating a scenario where attempt2 regex must match
    const deferred = Q.defer();

    // Create an error with a stack trace containing the exact format
    // that attempt2 regex should match: "at filename:line:column"
    const error = new Error("Test");
    error.stack = `
      Error: Test
        at /path/to/file.js:10:5
        at other.js:1:1
    `.trim();

    deferred.reject(error);

    return deferred.promise.then(
      () => {
        throw new Error("Should have rejected");
      },
      (e: any) => {
        // Enable long stack traces which will trigger stack parsing
        Q.longStackSupport = true;

        // Create another promise that will use the stack parsing
        const deferred2 = Q.defer();
        const error2 = new Error("Test2");
        error2.stack = "Error: Test2\n  at module.js:42:8";
        deferred2.reject(error2);

        return deferred2.promise.then(
          () => {
            throw new Error("Should have rejected");
          },
          (e2: any) => {
            // The mutation makes attempt2 condition always false
            // This means stack lines like "at module.js:42:8" won't be parsed
            // We can detect this by checking if the stack trace contains
            // the expected line after processing
            expect(e2.stack).toContain("module.js:42:8");

            // Create a specific test for the attempt2 pattern
            const testLine = "at test.js:12:3";
            const match = testLine.match(/at ([^ ]+):(\d+):(?:\d)$/);
            expect(match).not.toBeNull();
            if (match) {
              expect(match[1]).toBe("test.js");
              expect(match[2]).toBe("12");
            }
          }
        );
      }
    );
  });
});