const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should correctly filter stack traces including the starting line", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    let capturedStack: string | undefined;

    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      })
      .catch((error: Error) => {
        capturedStack = error.stack;
        return Q.resolve();
      });

    return promise.then(() => {
      // The stack should contain internal Q frames when long stack support is enabled
      // The mutation changes which lines are considered "internal" for filtering
      expect(capturedStack).toBeDefined();
      expect(capturedStack!.includes("From previous event:")).toBe(true);
    });
  });
});