// Test case to detect the mutation in the makeStackTraceLong function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation test", () => {
  it("should properly set __minimumStackCounter__ property on error object", async () => {
    // Create a scenario where long stack traces are enabled and multiple promises are chained
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a chain of promises that will be rejected
      const error = new Error("Test error");
      const promise1 = Q.reject(error);
      const promise2 = promise1.then(() => {
        throw new Error("Should not reach here");
      });

      // Force the promise to go through the rejection path
      await promise2.catch((e) => {
        // Check that the error object has the expected property set
        expect(e).toHaveProperty("__minimumStackCounter__");
        expect(typeof e.__minimumStackCounter__).toBe("number");
        expect(e.__minimumStackCounter__).toBeGreaterThan(0);
      });
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});