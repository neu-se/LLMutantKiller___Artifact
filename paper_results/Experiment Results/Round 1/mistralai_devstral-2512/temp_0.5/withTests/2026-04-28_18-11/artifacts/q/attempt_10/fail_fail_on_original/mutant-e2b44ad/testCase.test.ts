import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("process.domain check in done()", () => {
  it("should fail when process is not an object type", async () => {
    // Store original process
    const originalProcess = global.process;

    try {
      // Create a mock process that is not an object (empty string)
      // This tests the mutation where typeof process === "" instead of "object"
      (global as any).process = "";

      // Create a rejected promise
      const error = new Error("Test error");
      const promise = Q.reject(error);

      // This should fail in the original code because typeof "" === "string"
      // but should pass in the mutated code where typeof "" === ""
      let errorHandled = false;
      promise.done(null, (err: Error) => {
        errorHandled = true;
      });

      // Wait for promise to settle
      await new Promise(resolve => setTimeout(resolve, 10));

      // In original code, this should not be reached due to type mismatch
      // In mutated code, this would pass
      expect(errorHandled).toBe(true);
    } finally {
      // Restore original process
      (global as any).process = originalProcess;
    }
  });
});