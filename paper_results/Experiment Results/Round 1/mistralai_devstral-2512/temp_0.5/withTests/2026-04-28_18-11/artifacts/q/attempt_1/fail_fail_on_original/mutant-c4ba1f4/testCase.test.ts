import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("setImmediate fallback behavior", () => {
  it("should use MessageChannel when setImmediate is available but not functional", (done) => {
    // Save the original setImmediate and MessageChannel
    const originalSetImmediate = global.setImmediate;
    const originalMessageChannel = global.MessageChannel;

    // Mock setImmediate to exist but not work (empty function)
    global.setImmediate = () => {};
    // Ensure MessageChannel is available
    global.MessageChannel = originalMessageChannel;

    let testPassed = false;

    // Create a promise that should resolve asynchronously
    Q.resolve().then(() => {
      testPassed = true;
    });

    // Check after a short delay if the promise resolved
    setTimeout(() => {
      expect(testPassed).toBe(true);

      // Restore originals
      global.setImmediate = originalSetImmediate;
      global.MessageChannel = originalMessageChannel;

      done();
    }, 100);
  });
});