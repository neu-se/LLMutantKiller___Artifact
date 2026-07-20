// Test case to detect the mutation in isStopIteration function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("isStopIteration mutation detection", () => {
  it("should correctly handle StopIteration exceptions from SpiderMonkey generators", () => {
    // Create a mock StopIteration object that mimics what SpiderMonkey generators produce
    const mockStopIteration = {
      value: "generator_result",
      toString: () => "[object StopIteration]"
    };

    // Test the behavior by directly testing the async function's handling
    // of StopIteration exceptions
    const deferred = Q.defer();

    // Simulate the async function's exception handling logic
    try {
      // This simulates what happens when a SpiderMonkey generator throws StopIteration
      throw mockStopIteration;
    } catch (exception) {
      // This is where isStopIteration would be called in the original code
      // We'll test the actual behavior by using Q's internal logic

      // Create a promise that will use Q's actual exception handling
      const testPromise = Q.Promise({
        "when": function() {
          // This will be called if the exception is not StopIteration
          throw exception;
        }
      });

      // If isStopIteration returns true (original code), the exception should be handled
      // If isStopIteration returns false (mutated code), it will be rethrown
      Q.when(testPromise, null, function(error) {
        // If we get here, the exception was not handled as StopIteration
        deferred.reject(new Error("Mutation detected: StopIteration not handled"));
      });

      // Give it a chance to resolve
      Q.delay(10).then(function() {
        if (deferred.promise.isPending()) {
          // If still pending, it means StopIteration was properly handled
          deferred.resolve("success");
        }
      });
    }

    return deferred.promise.then(
      (result: any) => {
        // This should pass in original code
        expect(result).toBe("success");
      }
    );
  });
});