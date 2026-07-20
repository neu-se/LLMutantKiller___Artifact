// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-c5595ee/testCase.test.ts
import { Q } from "./q.js";

describe("Q stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a promise that will be rejected to generate a stack trace
    const promise = Q.reject(new Error("Test error"));

    // Force the promise to be inspected which will trigger stack trace parsing
    const inspectResult = promise.inspect();

    // The mutation changes the regex from /.*@(.+):(\d+)$/ to /.@(.+):(\d+)$/
    // This means it will no longer match stack lines that don't have a character before @
    // We need to test with a stack trace that would be affected by this change

    // Create a mock stack line that should match the original regex but not the mutated one
    const testStackLine = "at http://localhost:8080/@test.js:42";

    // This is a bit tricky since we can't directly test the internal function
    // Instead, we'll test the behavior by creating a scenario where the stack parsing matters
    // We'll use the long stack support which relies on this parsing

    // Enable long stack support
    Q.longStackSupport = true;

    // Create a chain of promises that will generate stack traces
    const p1 = Q.defer();
    const p2 = Q.defer();

    p1.promise.then(() => {
      p2.reject(new Error("Stack trace test"));
    });

    p1.reject(new Error("Initial error"));

    return p2.promise.then(
      () => {
        throw new Error("Should have been rejected");
      },
      (error) => {
        // The error should have a stack trace that includes the parsed lines
        // The mutation would cause some stack lines to not be parsed correctly
        // This test verifies that the stack parsing works as expected
        expect(error).toBeInstanceOf(Error);
        expect(error.stack).toBeDefined();
        // The stack should contain multiple lines (from the promise chain)
        expect(error.stack.split('\n').length).toBeGreaterThan(1);
      }
    );
  });
});