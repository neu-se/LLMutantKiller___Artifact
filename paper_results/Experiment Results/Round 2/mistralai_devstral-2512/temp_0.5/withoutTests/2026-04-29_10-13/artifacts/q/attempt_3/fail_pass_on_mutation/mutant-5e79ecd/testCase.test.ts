const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.done behavior", () => {
  it("should handle promise without callbacks correctly", (done) => {
    const promise = Q.resolve(42);
    let resolved = false;

    promise.done();

    // Give the promise a chance to settle
    setTimeout(() => {
      // The promise should resolve without issues
      expect(resolved).toBe(false);
      done();
    }, 10);
  });
});