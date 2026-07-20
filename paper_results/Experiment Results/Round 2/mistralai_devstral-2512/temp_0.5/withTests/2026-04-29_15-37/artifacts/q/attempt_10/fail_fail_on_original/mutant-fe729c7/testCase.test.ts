// Test case to detect the mutation in the array_reduce shim
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("array_reduce mutation test", () => {
  it("should correctly handle sparse arrays in Q.all with progress tracking", () => {
    // Create a sparse array of promises
    const sparsePromises = [];
    sparsePromises[0] = Q.resolve(1);
    sparsePromises[2] = Q.resolve(3);
    // Index 1 is missing

    let progressCount = 0;
    const progressValues: any[] = [];

    return Q.all(sparsePromises).then(
      (results) => {
        // This should not be reached if mutation causes error
        expect(true).toBe(false);
      },
      undefined,
      (progress) => {
        progressCount++;
        progressValues.push(progress);
      }
    ).catch((error) => {
      // With original code: should complete successfully
      // With mutated code: might throw error due to processing undefined elements
      throw error;
    }).then(() => {
      // If we get here, the operation completed
      // With original code: progressCount should be minimal (only for defined promises)
      // With mutated code: progressCount would be higher (processing all indices)
      expect(progressCount).toBeLessThan(3);
    });
  });
});