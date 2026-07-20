// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Long stack traces mutation test", () => {
  it("should properly set __minimumStackCounter__ property on error objects", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises to generate a stack trace
    const error = new Error("Test error");
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain that will reject with our error
    const promise = Q()
      .then(() => {
        return deferred1.promise;
      })
      .then(() => {
        return deferred2.promise;
      })
      .then(() => {
        throw error;
      });

    // Reject the first deferred to create a rejection in the chain
    deferred1.reject(error);

    try {
      await promise;
      fail("Promise should have rejected");
    } catch (e: any) {
      // Check that the error has the __minimumStackCounter__ property set
      expect(e).toHaveProperty("__minimumStackCounter__");
      expect(typeof e.__minimumStackCounter__).toBe("number");

      // The mutation changes the property name from "__minimumStackCounter__" to ""
      // This test will fail if the property is not set correctly
      expect(e.__minimumStackCounter__).toBeGreaterThan(0);
    } finally {
      // Clean up
      Q.longStackSupport = false;
    }
  });
});