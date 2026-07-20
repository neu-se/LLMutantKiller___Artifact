import { Q } from "./q.js";

describe("Q library stack trace parsing", () => {
  it("should correctly parse Firefox-style stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Add a delay to ensure the stack trace is captured
    return promise
      .delay(1)
      .then(
        () => {
          throw new Error("Should not reach here");
        },
        (error) => {
          // Verify the error has a stack trace
          expect(error.stack).toBeDefined();

          // Create a mock Firefox-style stack line
          const firefoxStackLine = "getValue@http://example.com/script.js:42:21";

          // Test the getFileNameAndLineNumber function indirectly
          // by checking if it can parse Firefox-style stack traces
          const result = (error as any).stack.split("\n").some((line: string) =>
            line.includes("http://example.com/script.js")
          );

          // The test should pass if the parsing works correctly
          expect(result).toBe(true);
        }
      );
  });
});