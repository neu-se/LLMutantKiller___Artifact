const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter Node.js internal frames from stack traces", () => {
    // Create a mock stack trace with Node.js frames
    const mockStack = `
      Error: Test error
        at Test.<anonymous> (test.js:10:5)
        at someFunction (node.js:123:45)
        at anotherFunction (test.js:15:10)
    `.trim();

    // Create an error with this stack
    const error = new Error("Test error");
    error.stack = mockStack;

    // Create a rejected promise with this error
    const promise = Q.reject(error);

    // Enable long stack support to trigger filtering
    Q.longStackSupport = true;

    return promise.catch((caughtError: Error) => {
      // Check if Node.js frames were filtered
      const stillHasNodeFrames = caughtError.stack?.includes("(node.js:");

      // Original code should filter them (false), mutated code won't (true)
      expect(stillHasNodeFrames).toBe(false);
    });
  });
});