const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter Node.js internal frames from stack traces", () => {
    // Create a mock error with a stack trace containing Node.js frames
    const error = new Error("Test error");
    error.stack = `
      Error: Test error
        at Test.<anonymous> (test.js:10:5)
        at someFunction (node.js:123:45)
        at anotherFunction (test.js:15:10)
    `.trim();

    // Create a promise that will use the stack filtering
    const promise = Q.reject(error);

    // Force stack trace processing by enabling long stack support
    Q.longStackSupport = true;

    // The promise should filter out the Node.js frame
    return promise.catch((caughtError) => {
      const hasNodeFrame = caughtError.stack?.includes("(node.js:");
      // Original code should filter out node.js frames (hasNodeFrame should be false)
      // Mutated code will not filter them (hasNodeFrame will be true)
      expect(hasNodeFrame).toBe(false);
    });
  });
});