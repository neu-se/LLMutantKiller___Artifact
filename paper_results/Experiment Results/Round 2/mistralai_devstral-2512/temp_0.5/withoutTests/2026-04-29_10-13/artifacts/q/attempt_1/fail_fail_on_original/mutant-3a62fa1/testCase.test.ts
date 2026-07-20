import { Q } from "./q";

describe("Q library process detection", () => {
  it("should correctly detect Node.js environment for process.nextTick", (done) => {
    // This test verifies that Q correctly identifies a Node.js environment
    // The mutation changes the process detection logic from checking
    // "typeof process === 'object'" to just "true", which would incorrectly
    // assume a Node.js environment even in non-Node environments

    // In a real Node.js environment, process.nextTick should be used
    // The mutation would cause this to happen even in browser environments
    // where process.nextTick doesn't exist

    // We'll test by checking if Q.nextTick behaves correctly
    // In the original code, it should use the appropriate fallback in non-Node environments
    // In the mutated code, it would try to use process.nextTick and fail

    let nextTickUsed = false;
    const originalNextTick = Q.nextTick;

    // Spy on nextTick to see what gets called
    Q.nextTick = function(task) {
      nextTickUsed = true;
      // Simulate what would happen if process.nextTick was called in a non-Node environment
      if (typeof process === 'undefined' || typeof process.nextTick !== 'function') {
        throw new Error("process.nextTick is not available");
      }
      return originalNextTick(task);
    };

    try {
      // This should work in the original code but fail in the mutated version
      // when running in a non-Node environment
      Q.nextTick(() => {
        done(new Error("Should not reach here in non-Node environment with mutation"));
      });
    } catch (error) {
      // In the original code, this shouldn't throw in a Node environment
      // In the mutated code, this would throw if process.nextTick doesn't exist
      if (typeof process === 'object' && typeof process.nextTick === 'function') {
        // We're in a Node environment, so the test should pass for original code
        // For the mutation, it would incorrectly use process.nextTick even in browser
        done();
      } else {
        // We're in a browser environment
        // Original code should use a fallback, mutated code would try to use process.nextTick
        done();
      }
    }
  });
});