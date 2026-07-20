import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("hasStacks mutation test", () => {
  it("should not modify error objects when hasStacks is false", async () => {
    // Create a promise chain that will reject with an error
    const originalError = new Error("Test error");
    const promise = Q.reject(originalError);

    // Capture the error that comes through the rejection
    let caughtError: Error | undefined;
    try {
      await promise;
    } catch (error) {
      caughtError = error as Error;
    }

    // With hasStacks=false, the error should be the same object
    // With hasStacks=true, the library would modify the error (add stack property)
    expect(caughtError).toBe(originalError);

    // Also verify that no extra properties were added to the error
    const originalKeys = Object.keys(originalError);
    const caughtKeys = Object.keys(caughtError!);
    expect(caughtKeys).toEqual(originalKeys);
  });
});