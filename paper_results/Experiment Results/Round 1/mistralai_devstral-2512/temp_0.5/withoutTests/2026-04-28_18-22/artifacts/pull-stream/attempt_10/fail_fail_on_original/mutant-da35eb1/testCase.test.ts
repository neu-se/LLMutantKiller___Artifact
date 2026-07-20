const find = require("../../../../../../../../../../../subject_repositories/pull-stream/sinks/find.js");

describe("find sink mutation test", () => {
  it("should pass error through when err is not true", (done) => {
    const testFn = (x: any) => x === 3;
    const testError = new Error("test error");

    const callback = (err: Error | null, data: any) => {
      // Original code should pass the error through
      // Mutated code will always pass null
      expect(err).toBe(testError);
      expect(data).toBeNull();
      done();
    };

    // Create a sink that will receive an error that's not true
    const sink = find(testFn, callback);

    // Simulate the drain function calling our error handler with a non-true error
    sink(true, null); // End the stream
    const errorHandler = sink[1]; // Access the error handler function
    errorHandler(testError); // Call with our test error
  });
});