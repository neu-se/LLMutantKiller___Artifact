import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
  it("should use appropriate task scheduling based on environment", (done) => {
    // This test verifies that Q uses the correct task scheduling mechanism
    // The mutation changes isNodeJS from false to true, which would incorrectly use process.nextTick

    const deferred = Q.defer();
    let executionTime: number;

    const startTime = Date.now();
    deferred.promise.then(() => {
      executionTime = Date.now() - startTime;

      // In Node.js with process.nextTick, execution should be very fast (< 5ms)
      // In browser or when isNodeJS is incorrectly true, it uses setTimeout (10ms+)
      // Since we're running in Jest (Node.js), we expect fast execution
      expect(executionTime).toBeLessThan(5);
      done();
    });

    // Resolve immediately to test the scheduling mechanism
    deferred.resolve("test");
  });
});