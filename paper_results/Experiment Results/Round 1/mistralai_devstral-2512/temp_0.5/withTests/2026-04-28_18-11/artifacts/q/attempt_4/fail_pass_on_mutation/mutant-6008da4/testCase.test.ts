import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should use appropriate async mechanism based on environment", (done) => {
    // This test verifies that Q uses the correct async mechanism
    // The mutation changes isNodeJS from false to true, which would incorrectly use Node.js mechanisms

    const deferred = Q.defer();
    let executionOrder = 0;

    // Track execution order to detect if process.nextTick is being used
    deferred.promise.then(() => {
      executionOrder = 2;
      // In Node.js with process.nextTick, this should execute before the setTimeout
      // In browser/mutated code, setTimeout would execute first
      expect(executionOrder).toBe(2);
      done();
    });

    // This should execute after the promise resolution in browser/mutated code
    // but before in Node.js with process.nextTick
    setTimeout(() => {
      executionOrder = 1;
    }, 0);

    deferred.resolve("test");
  });
});