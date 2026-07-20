import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should correctly identify non-NodeJS environment", (done) => {
    // This test verifies that Q correctly identifies when it's not running in a NodeJS environment
    // The mutation changes isNodeJS from false to true, which would break this behavior

    // Create a deferred and resolve it
    const deferred = Q.defer();
    let executionTime: number;

    // Set up a timeout to check if the promise was resolved in Node.js style
    // In a real Node.js environment, this would use process.nextTick
    // In browser or mutated code (where isNodeJS=true), it would use setTimeout
    const startTime = Date.now();
    deferred.promise.then(() => {
      executionTime = Date.now() - startTime;

      // In a real Node.js environment with proper nextTick, execution should be very fast (< 5ms)
      // In browser or when isNodeJS is incorrectly set to true, it would use setTimeout (10ms+)
      // Since we're running in Jest (Node.js), we expect fast execution
      expect(executionTime).toBeLessThan(5);
      done();
    });

    // Resolve the deferred
    deferred.resolve("test");
  });
});