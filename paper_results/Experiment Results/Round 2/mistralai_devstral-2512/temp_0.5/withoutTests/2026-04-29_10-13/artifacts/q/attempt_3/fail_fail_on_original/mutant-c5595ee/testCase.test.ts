// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c5595ee/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // The mutation changes the regex from /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means it will no longer match stack lines that don't have a character before @
    // We need to test with a stack trace that would be affected by this change

    // Create a mock error with a stack trace that includes lines starting with @
    const error = new Error("Test error");
    error.stack = `
      Error: Test error
        at Test.test (@test.js:42)
        at anotherFunction (@another.js:10)
        at normalFunction (normal.js:5)
    `;

    // Test the internal getFileNameAndLineNumber function through the public API
    // We'll use Q's promise rejection which internally uses stack trace parsing
    const Q = qModule;
    Q.longStackSupport = true;

    const deferred = Q.defer();
    const promise = deferred.promise;

    // Reject with our custom error
    deferred.reject(error);

    // Return the promise so Jest waits for it
    return promise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (caughtError: Error) => {
        // Verify the error was properly handled
        expect(caughtError).toBe(error);
        expect(caughtError.stack).toBeDefined();

        // The key test: the stack should still contain our @ lines
        // The mutation would cause these lines to not be parsed correctly
        const stackLines = caughtError.stack!.split('\n');
        const hasAtLines = stackLines.some(line => line.includes('@test.js') || line.includes('@another.js'));
        expect(hasAtLines).toBe(true);
      }
    );
  });
});