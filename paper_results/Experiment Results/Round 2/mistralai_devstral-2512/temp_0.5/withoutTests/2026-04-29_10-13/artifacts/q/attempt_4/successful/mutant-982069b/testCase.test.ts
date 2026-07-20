const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should properly filter stack traces by removing internal frames", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a rejected promise with a stack trace
    const error = new Error("test error");
    const promise = Q.reject(error);

    // Chain another promise to create more stack frames
    return promise.then(() => {
      throw new Error("should not reach here");
    }).catch((caughtError: Error) => {
      // The original code should filter out internal Q frames
      // The mutated code will leave the stack trace empty
      expect(caughtError.stack).toBeTruthy();
      expect(caughtError.stack.includes("From previous event:")).toBe(true);
      expect(caughtError.stack.split('\n').length).toBeGreaterThan(2);
    });
  });
});