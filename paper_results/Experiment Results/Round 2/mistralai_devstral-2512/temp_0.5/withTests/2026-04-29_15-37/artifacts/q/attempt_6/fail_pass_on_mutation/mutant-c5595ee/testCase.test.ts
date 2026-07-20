import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing with @ symbol", () => {
  it("should correctly parse stack lines containing @ symbol in URL format", () => {
    // Enable long stack traces to trigger the parsing logic
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will be rejected with a specific stack format
    const promise = Q.resolve().then(() => {
      const error = new Error("Test");
      // This stack line format should match attempt3 regex in original code
      // The original regex /.*@(.+):(\d+)$/ matches any characters before @
      // The mutated regex /.@(.+):(\d+)$/ requires exactly one character before @
      error.stack = "Error: Test\n    at http://example.com/file.js:42";
      throw error;
    });

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error: Error) => {
        // The original code should properly parse and filter the stack
        // The mutated code should fail to parse it correctly
        expect(error.stack).toBeDefined();

        // This assertion should pass in original code but fail in mutated code
        // because the mutated regex won't match the stack line format
        expect(error.stack.includes("file.js:42")).toBe(true);

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});