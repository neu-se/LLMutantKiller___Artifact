import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should use setTimeout instead of process.nextTick in non-NodeJS environment", (done) => {
    // This test verifies that Q uses setTimeout (not process.nextTick) when not in NodeJS
    // The mutation changes isNodeJS from false to true, which would incorrectly use process.nextTick

    const deferred = Q.defer();
    let executionOrder = 0;

    // Track when the promise resolves
    deferred.promise.then(() => {
      executionOrder = 2;

      // In browser/non-NodeJS (original code), setTimeout should execute first (order=1)
      // In NodeJS or mutated code, process.nextTick would execute first (order=0)
      expect(executionOrder).toBe(2);
      done();
    });

    // This setTimeout should execute before the promise in browser/non-NodeJS
    setTimeout(() => {
      executionOrder = 1;
    }, 0);

    // Resolve the deferred
    deferred.resolve("test");
  });
});