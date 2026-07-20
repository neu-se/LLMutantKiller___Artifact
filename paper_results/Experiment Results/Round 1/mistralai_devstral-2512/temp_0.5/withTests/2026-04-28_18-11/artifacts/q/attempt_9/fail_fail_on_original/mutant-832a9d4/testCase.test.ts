// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_9/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel fallback behavior", () => {
  it("should use MessageChannel when available for async execution", (done) => {
    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to verify it's being used
    let messageChannelUsed = false;
    (global as any).MessageChannel = function() {
      messageChannelUsed = true;
      const channel = {
        port1: {
          onmessage: null,
          postMessage: () => {}
        },
        port2: {
          postMessage: () => {}
        }
      };
      return channel;
    };

    // Track execution
    let taskExecuted = false;
    Q.nextTick(() => {
      taskExecuted = true;
    });

    // Check after a delay
    setTimeout(() => {
      // Restore original
      (global as any).MessageChannel = originalMessageChannel;

      // In original code, MessageChannel should be used when available
      // In mutated code, the if block is empty so it falls through to setTimeout
      if (messageChannelUsed && taskExecuted) {
        done();
      } else {
        done(new Error("MessageChannel was not used"));
      }
    }, 10);
  });
});