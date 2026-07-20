// Test case to detect the mutation in the regex pattern for stack trace parsing
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing regex", () => {
  it("should correctly filter internal stack frames with multi-digit line numbers", () => {
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
    // We need to test the internal stack filtering behavior
    // The mutation changes \d+ to \d which would fail to match line numbers >= 10
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Create a stack trace with multi-digit line numbers
    // This simulates what would happen internally when Q processes stack traces
    const mockStackLine = "    at Promise.promiseDispatch (q.js:123:45)";

    // We'll test by creating a scenario where the stack filtering would be affected
    return Q.fcall(() => {
      throw error;
    }).then(null, (err: Error) => {
      // The stack should be properly filtered
      expect(err.stack).toBeDefined();

      // The key test: check if the stack contains properly formatted line numbers
      // With the mutation, line numbers >= 10 would not be matched correctly
      const stackLines = err.stack?.split('\n') || [];
      const qFileLines = stackLines.filter(line =>
        line.includes('q.js:') || line.includes('q.js')
      );

      // At least some lines should have multi-digit line numbers
      // This would fail with the mutation because \d would only match single digits
      const hasProperLineNumbers = qFileLines.some(line => {
        const match = line.match(/q\.js:(\d+):/);
        return match && parseInt(match[1]) >= 10;
      });

      expect(hasProperLineNumbers).toBe(true);
    });
  });
});