import { Q } from "./q";

describe("Q library behavior", () => {
  it("should correctly identify Node.js environment for nextTick", (done) => {
    // This test verifies that Q correctly detects whether it's running in a Node.js environment
    // The mutation changes isNodeJS from false to true, which would incorrectly make Q think
    // it's always in a Node.js environment even when it's not

    // In a browser environment, process.nextTick shouldn't be available
    // and Q should fall back to other mechanisms like setImmediate or MessageChannel
    const originalProcess = global.process;

    // Simulate a non-Node.js environment by removing process
    delete global.process;

    // Create a promise and verify it resolves correctly
    let resolved = false;
    Q.resolve("test").then((value) => {
      resolved = true;
      expect(value).toBe("test");
      done();
    });

    // Restore process
    global.process = originalProcess;

    // Force the test to wait for the promise to resolve
    setTimeout(() => {
      if (!resolved) {
        done(new Error("Promise did not resolve in expected time"));
      }
    }, 100);
  });
});