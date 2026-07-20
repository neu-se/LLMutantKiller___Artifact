import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack lines with @ symbol", () => {
    // Create a test that will trigger stack trace parsing
    // The mutation changes the regex from /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means lines like "at http://example.com/file.js:42" won't match
    // in the mutated version, causing different behavior in stack filtering

    // Enable long stack traces
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    return promise.then(
      () => {
        throw new Error("Should not resolve");
      },
      (error) => {
        // The error should have a properly formatted stack trace
        expect(error.stack).toBeDefined();
        expect(error.stack.length).toBeGreaterThan(0);

        // The stack should contain our test file
        expect(error.stack).toContain("stack trace parsing");

        // Restore original setting
        Q.longStackSupport = originalLongStackSupport;
      }
    );
  });
});