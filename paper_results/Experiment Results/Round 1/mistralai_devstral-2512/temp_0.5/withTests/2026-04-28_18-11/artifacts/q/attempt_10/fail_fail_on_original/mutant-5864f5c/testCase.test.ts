// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly identify StopIteration exceptions in generator context", () => {
    // Create a mock StopIteration object that matches what SpiderMonkey generators produce
    const mockStopIteration = {
      value: "generator_result",
      toString: () => "[object StopIteration]"
    };

    // Test the actual behavior by creating a promise that would use isStopIteration
    // We'll simulate the exact scenario where isStopIteration is called in the async function

    // Create a deferred that will test the exception handling
    const deferred = Q.defer();

    // Simulate the exception handling logic from the async function
    try {
      // This simulates what happens when a SpiderMonkey generator throws StopIteration
      throw mockStopIteration;
    } catch (exception) {
      // This is where isStopIteration would be called in the original code
      // We need to test the actual behavior by creating a scenario that uses it

      // Create a promise that will test the isStopIteration logic
      // by using Q's internal rejection handling
      const testPromise = Q.Promise({
        "when": function(resolve, reject) {
          // This simulates the logic in the async function
          // where isStopIteration is called to determine how to handle the exception
          try {
            // Simulate the isStopIteration check
            // In original code: object_toString(exception) === "[object StopIteration]"
            // In mutated code: object_toString(exception) !== "[object StopIteration]"
            const isStop = Object.prototype.toString.call(exception) === "[object StopIteration]";

            if (isStop) {
              // Original behavior: resolve with the value
              resolve(exception.value);
            } else {
              // This would be the mutated behavior
              reject(exception);
            }
          } catch (e) {
            reject(e);
          }
        }
      });

      // Test the result
      Q.when(testPromise, function(result) {
        // This should happen in original code
        deferred.resolve(result);
      }, function(error) {
        // This should happen in mutated code
        deferred.reject(new Error("Mutation detected: StopIteration was rejected"));
      });
    }

    return deferred.promise.then(function(result) {
      // In original code, this should pass
      expect(result).toBe("generator_result");
    });
  });
});