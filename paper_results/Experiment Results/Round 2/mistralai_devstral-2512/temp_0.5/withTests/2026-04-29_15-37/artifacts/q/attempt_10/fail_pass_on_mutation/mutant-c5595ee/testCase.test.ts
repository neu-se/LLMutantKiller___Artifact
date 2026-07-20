import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with @ symbol in Safari format", () => {
    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise that will be rejected
    const promise = Q.resolve().then(() => {
      const error = new Error("Test");
      // Safari format stack line that should match attempt3 regex
      // Original regex: /.*@(.+):(\d+)$/ - matches any characters before @
      // Mutated regex: /.@(.+):(\d+)$/ - requires exactly one character before @
      error.stack = "Test@file.js:42";
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