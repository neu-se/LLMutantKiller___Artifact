// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-56536c0/testCase.test.ts
import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel detection", () => {
  it("should use MessageChannel when available for async scheduling", (done) => {
    // This test verifies that Q uses MessageChannel for async scheduling when available
    // The mutation changes the condition from checking MessageChannel to always false
    // which would prevent MessageChannel from being used even when available

    // Create a spy to track which scheduling mechanism is used
    const originalMessageChannel = (global as any).MessageChannel;
    const originalSetImmediate = (global as any).setImmediate;
    const originalProcess = (global as any).process;

    // Mock environment to force MessageChannel path
    (global as any).MessageChannel = class {
      port1 = { onmessage: null };
      port2 = { postMessage: () => {} };
    };
    (global as any).setImmediate = undefined;
    (global as any).process = undefined;

    let messageChannelUsed = false;
    const originalPortPostMessage = (global as any).MessageChannel.prototype.port2.postMessage;
    (global as any).MessageChannel.prototype.port2.postMessage = function() {
      messageChannelUsed = true;
      return originalPortPostMessage.apply(this, arguments);
    };

    // Test that Q uses MessageChannel for scheduling
    Q.nextTick(() => {
      expect(messageChannelUsed).toBe(true);
      done();
    });

    // Restore original environment
    (global as any).MessageChannel = originalMessageChannel;
    (global as any).setImmediate = originalSetImmediate;
    (global as any).process = originalProcess;
  });
});