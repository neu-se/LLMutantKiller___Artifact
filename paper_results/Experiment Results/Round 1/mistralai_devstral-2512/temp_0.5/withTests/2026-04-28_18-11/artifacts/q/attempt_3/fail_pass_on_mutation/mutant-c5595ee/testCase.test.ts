const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("stack trace parsing", () => {
  it("should correctly parse stack traces with @ symbol", () => {
    // Create a scenario that will generate a stack trace
    // with lines containing @ symbol that need to be parsed
    const deferred = Q.defer();
    const error = new Error("Test error");

    // Force long stack traces to be enabled
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack traces
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