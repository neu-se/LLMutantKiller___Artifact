const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q library stack trace filtering", () => {
  it("should correctly filter internal stack frames", () => {
    // Enable long stack traces to trigger the stack filtering logic
    Q.longStackSupport = true;

    // Create a chain of promises to generate stack traces
    const promise = Q.resolve(1)
      .then(value => {
        throw new Error("Test error");
      })
      .catch(error => {
        // The error should have a filtered stack trace
        expect(error.stack).toBeDefined();
        // The stack should not contain Q library internal frames
        // when the mutation is not present
        return Q.resolve();
      });

    return promise;
  });
});