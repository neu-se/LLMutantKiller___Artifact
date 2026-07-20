// Test case to detect the mutation in q.js
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace filtering", () => {
  it("should not filter all stack frames when checking line numbers", () => {
    // Enable long stack traces
    Q.longStackSupport = true;

    // Create a promise chain that will generate stack frames
    const promise = Q().then(() => {
      throw new Error("Test error");
    });

    return promise.then(
      () => {
        throw new Error("Should not reach here");
      },
      (error: Error) => {
        const stack = error.stack;
        expect(stack).toBeDefined();

        // The mutation changes the condition from checking line numbers to always true
        // This means in the mutated version, ALL frames would be filtered out
        // In the original version, only Q internal frames should be filtered
        const lines = stack.split('\n').filter(line => line.trim() !== '');

        // In the original code, we should have some frames remaining
        // In the mutated code, all frames would be filtered out
        expect(lines.length).toBeGreaterThan(1);

        // Check that we have actual stack frames (not just the error message)
        const hasStackFrames = lines.some(line =>
          line.includes('.js:') || line.includes('at ')
        );
        expect(hasStackFrames).toBe(true);

        // Verify that the stack contains expected patterns
        expect(stack).toMatch(/Test error/);
        expect(stack).toMatch(/at /);

        // Check that we have at least 3 lines (error message + at least 2 stack frames)
        expect(lines.length).toBeGreaterThanOrEqual(3);

        // Verify that the stack contains "From previous event" separator
        // This should be present in the original code but might be filtered in mutated version
        expect(stack).toMatch(/From previous event/);

        // Check that we have at least one frame that is not from q.js
        const hasNonQFrames = lines.some(line =>
          line.includes('at ') && !line.includes('q.js')
        );
        expect(hasNonQFrames).toBe(true);
      }
    );
  });
});