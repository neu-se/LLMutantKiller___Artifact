import { Q } from "./q";

describe("Q stack trace filtering", () => {
  it("should correctly filter internal frames from stack traces", () => {
    // Create a scenario where we can observe the stack trace filtering behavior
    const originalLongStackSupport = Q.longStackSupport;
    Q.longStackSupport = true;

    try {
      // Create a promise chain that will generate a stack trace
      const promise = Q.reject(new Error("Test error"));

      // Force the promise to be handled in a way that triggers stack trace filtering
      return promise.then(
        () => {},
        (error) => {
          // The stack trace should be filtered to remove internal Q frames
          // With the mutation, the filtering logic is broken (OR instead of AND)
          // This should cause more frames to be incorrectly included
          const stack = error.stack;
          // Check that internal Q frames are properly filtered out
          // The mutation would cause some internal frames to remain
          expect(stack).not.toContain("at Promise");
          expect(stack).not.toContain("at defer");
          expect(stack).not.toContain("at Q.reject");
        }
      );
    } finally {
      Q.longStackSupport = originalLongStackSupport;
    }
  });
});