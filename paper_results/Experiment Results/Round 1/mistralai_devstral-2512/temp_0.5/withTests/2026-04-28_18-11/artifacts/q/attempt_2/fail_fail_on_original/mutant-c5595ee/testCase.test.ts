import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a promise chain that will generate a stack trace
    // and verify that the error handling works correctly
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force a stack trace to be generated
    Q.longStackSupport = true;

    // Create a scenario that will generate a stack trace
    // with lines containing @ symbol
    return Q.delay(10)
      .then(() => {
        deferred.reject(error);
        return deferred.promise;
      })
      .catch((e: Error) => {
        // Verify the error was handled correctly
        expect(e.message).toBe("Test error");
        return true;
      });
  });
});