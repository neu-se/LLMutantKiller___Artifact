const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q stack trace filtering", () => {
  it("should filter out Node.js internal frames from stack traces", () => {
    // Create a promise chain that will generate a stack trace
    const promise = Q.resolve()
      .then(() => {
        throw new Error("Test error");
      });

    return promise
      .catch((error: Error) => {
        // The stack trace should not contain Node.js internal frames
        expect(error.stack).not.toMatch(/node.js/);
        expect(error.stack).not.toMatch(/module.js/);
      });
  });
});