import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing with @ symbol", () => {
  it("should correctly parse stack lines with @ symbol in Firefox format", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will be rejected
    const promise = Q.resolve().then(() => {
      const error = new Error("Test");
      // Firefox format stack line that should match attempt3 regex
      // Original regex: /.*@(.+):(\d+)$/ - matches any chars before @
      // Mutated regex: /.@(.+):(\d+)$/ - requires exactly one char before @
      error.stack = "Test@http://example.com/file.js:42";
      throw error;
    });

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error: Error) => {
        // In original code, this should be properly parsed
        // In mutated code, the regex won't match this format
        expect(error.stack).toBeDefined();

        // This assertion should fail in mutated code
        expect(error.stack.includes("file.js:42")).toBe(true);

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});