// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions", () => {
    // Create a mock StopIteration object that matches what SpiderMonkey generators produce
    const mockStopIteration = {
      value: 42,
      toString: () => "[object StopIteration]"
    };

    // Test the actual behavior by creating a scenario where isStopIteration would be called
    // We'll use Q's internal promise mechanism to test this
    const deferred = Q.defer();

    // Simulate the exception handling that occurs in the async function
    try {
      // This simulates what happens when a SpiderMonkey generator throws StopIteration
      throw mockStopIteration;
    } catch (exception) {
      // This is where isStopIteration would be called in the original code
      // We need to test if the exception is properly identified as StopIteration

      // Create a promise that will test the actual isStopIteration behavior
      // by using Q's rejection mechanism
      const testPromise = Q.reject(exception);

      // In the original code, if isStopIteration returns true, the exception
      // should be handled specially (resolved with its value)
      // In the mutated code, it will be treated as a regular rejection

      // Check the promise's state after a short delay
      Q.delay(10).then(() => {
        if (testPromise.isRejected()) {
          // If it's rejected, check if it's our StopIteration
          const inspection = testPromise.inspect();
          if (inspection.reason === mockStopIteration) {
            // In original code, this shouldn't happen - StopIteration should be handled
            // In mutated code, this will happen
            deferred.reject(new Error("Mutation detected: StopIteration was not properly handled"));
          } else {
            deferred.resolve("success");
          }
        } else {
          // If not rejected, it means StopIteration was properly handled
          deferred.resolve("success");
        }
      });
    }

    return deferred.promise;
  });
});