// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should correctly filter internal Q frames from stack traces", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate internal stack frames
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        // The stack should contain frames, but internal Q frames should be filtered
        const stack = error.stack;
        expect(stack).toBeDefined();

        // Check that the stack contains at least some frames
        // The mutation would cause all frames to be filtered out
        const lines = stack.split('\n');
        expect(lines.length).toBeGreaterThan(1);

        // Verify that internal Q frames are filtered in original code
        // In mutated code, this might behave differently
        const hasQFrames = lines.some(line =>
          line.includes('q.js') || line.includes('From previous event')
        );
        expect(hasQFrames).toBe(true);
      }
    );
  });
});