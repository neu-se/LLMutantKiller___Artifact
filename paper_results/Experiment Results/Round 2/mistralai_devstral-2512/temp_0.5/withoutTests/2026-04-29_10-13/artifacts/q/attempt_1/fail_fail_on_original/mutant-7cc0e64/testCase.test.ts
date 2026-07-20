import { Q } from "./q.js";

describe("Q.done unhandled error handling", () => {
  it("should handle unhandled errors without domain binding when process.domain is not available", async () => {
    // Mock process without domain
    const originalProcess = global.process;
    global.process = { ...originalProcess, domain: undefined };

    try {
      const error = new Error("Test error");
      const promise = Q.reject(error);

      // This should not throw synchronously
      promise.done();

      // Give time for the unhandled error to be processed
      await new Promise(resolve => setTimeout(resolve, 10));

      // If the mutation is present (if (true)), it would try to bind to undefined domain
      // which would cause a TypeError. The test passes if no error is thrown.
    } finally {
      global.process = originalProcess;
    }
  });
});