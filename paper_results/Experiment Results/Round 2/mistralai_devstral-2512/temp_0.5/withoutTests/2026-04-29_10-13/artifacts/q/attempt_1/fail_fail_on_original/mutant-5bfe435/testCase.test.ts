import { Q } from "./q";

describe("Q.nextTick behavior", () => {
  it("should use process.nextTick when in a Node.js environment", (done) => {
    // This test verifies that Q.nextTick uses process.nextTick in a Node.js environment
    // The mutation changes the condition to `if (false)`, which would prevent process.nextTick from being used
    const startTime = Date.now();
    let nextTickUsed = false;

    // Override process.nextTick to detect if it's being used
    const originalNextTick = process.nextTick;
    process.nextTick = function(callback) {
      nextTickUsed = true;
      originalNextTick.call(process, callback);
    };

    Q.nextTick(() => {
      // Restore original process.nextTick
      process.nextTick = originalNextTick;

      // Verify that process.nextTick was used
      expect(nextTickUsed).toBe(true);
      // Also verify the task was executed
      expect(Date.now() - startTime).toBeGreaterThanOrEqual(0);
      done();
    });
  });
});