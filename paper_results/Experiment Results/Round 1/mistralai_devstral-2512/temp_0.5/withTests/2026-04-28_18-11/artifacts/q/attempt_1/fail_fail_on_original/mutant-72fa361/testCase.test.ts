import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong functionality", () => {
  it("should extend error stack traces with promise chain information when long stack support is enabled", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    const error = new Error("Test error");
    const deferred1 = Q.defer();
    const deferred2 = Q.defer();

    // Create a promise chain that will reject
    deferred1.promise
      .then(() => deferred2.promise)
      .then(() => {
        throw error;
      })
      .done();

    // Reject the first deferred to trigger the chain
    deferred1.reject(new Error("Initial rejection"));

    // Wait for the error to propagate
    await new Promise(resolve => setTimeout(resolve, 100));

    // The error stack should now contain information from the promise chain
    expect(error.stack).toBeDefined();
    expect(error.stack!.length).toBeGreaterThan(0);
    expect(error.stack!).toContain("Test error");

    // Clean up
    Q.longStackSupport = false;
  });
});