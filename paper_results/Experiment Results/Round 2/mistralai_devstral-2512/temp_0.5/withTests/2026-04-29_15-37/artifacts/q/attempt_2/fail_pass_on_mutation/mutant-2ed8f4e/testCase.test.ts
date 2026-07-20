import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString mutation test", () => {
  it("should filter internal frames from long stack traces", async () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a chain of promises that will generate a stack trace
    const error = new Error("Test error");
    const promise = Q.reject(error);

    try {
      await promise;
    } catch (e: any) {
      // The original implementation should filter out internal frames
      // The mutated implementation (empty function) should not filter anything
      const stack = e.stack;
      expect(stack).toBeDefined();

      // Check that internal frames are filtered out
      // The mutation would cause this to fail since filterStackString does nothing
      expect(stack).not.toMatch(/at.*q\.js/);
      expect(stack).not.toMatch(/at.*filterStackString/);
    } finally {
      // Restore original setting
      Q.longStackSupport = false;
    }
  });
});