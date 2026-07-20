// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel fallback behavior", () => {
  it("should execute tasks asynchronously using MessageChannel when available", (done) => {
    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to track its usage
    let messageChannelUsed = false;
    (global as any).MessageChannel = function() {
      messageChannelUsed = true;
      this.port1 = {
        onmessage: null,
        postMessage: () => {}
      };
      this.port2 = {
        postMessage: () => {}
      };
    };

    // Test that Q.nextTick uses MessageChannel
    let taskExecuted = false;
    Q.nextTick(() => {
      taskExecuted = true;
    });

    // Check after a short delay
    setTimeout(() => {
      // Restore original MessageChannel
      (global as any).MessageChannel = originalMessageChannel;

      if (messageChannelUsed && taskExecuted) {
        done();
      } else {
        done(new Error("MessageChannel was not used or task was not executed"));
      }
    }, 50);
  });
});