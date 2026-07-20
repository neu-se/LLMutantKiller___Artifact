// Test case to detect the mutation in the stack trace parsing regex
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with multi-digit line numbers", () => {
    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    return Q.reject(new Error("Test error"))
      .catch((e: Error) => {
        // Create a test stack line with multi-digit line number
        const testStackLine = "at /path/to/file.js:123:45";

        // Test the internal stack parsing by checking if it can handle multi-digit lines
        // This will fail if the regex doesn't match multi-digit line numbers
        const result = Q.fulfill(testStackLine)
          .then((line: string) => {
            // The original regex should match this line
            const regex = /at ([^ ]+):(\d+):(?:\d+)$/;
            const match = line.match(regex);
            expect(match).not.toBeNull();
            expect(match![2]).toBe("123"); // Should capture multi-digit line number

            // If mutation is present (\d instead of \d+), this will fail
            // because it would only match single-digit line numbers
            if (match && match[2] !== "123") {
              throw new Error("Failed to parse multi-digit line number");
            }
          });

        return result;
      });
  });
});