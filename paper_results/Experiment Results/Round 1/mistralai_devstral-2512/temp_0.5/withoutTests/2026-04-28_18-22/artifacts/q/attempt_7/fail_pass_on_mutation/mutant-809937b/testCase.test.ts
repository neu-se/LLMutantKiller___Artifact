import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q unhandled rejection tracking", () => {
  it("should only track unhandled rejections when process.emit is a function", (done) => {
    // Save original process.emit
    const originalEmit = process.emit;
    const emissions: string[] = [];

    // Mock process.emit to track calls
    process.emit = function(event: string, ...args: any[]) {
      emissions.push(event);
      return true;
    };

    // Create rejected promise when process.emit is a function
    const promise1 = Q.reject(new Error("test1"));

    setTimeout(() => {
      const firstEmissions = [...emissions];
      emissions.length = 0;

      // Now make process.emit an object (not a function)
      process.emit = {} as any;

      // Create another rejected promise
      const promise2 = Q.reject(new Error("test2"));

      setTimeout(() => {
        // Restore original
        process.emit = originalEmit;

        // Original code: should have 1 emission in firstEmissions, 0 in emissions
        // Mutated code: should have 1 in firstEmissions, 1 in emissions
        if (firstEmissions.length === 1 && emissions.length === 0) {
          done();
        } else {
          done(new Error(`Expected [1,0] emissions but got [${firstEmissions.length},${emissions.length}]`));
        }
      }, 100);
    }, 100);
  });
});