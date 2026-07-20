// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_7/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel fallback behavior", () => {
  it("should properly initialize MessageChannel when available", (done) => {
    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to track initialization
    let port1OnMessageSet = false;
    let port2PostMessageCalled = false;

    (global as any).MessageChannel = function() {
      this.port1 = {
        onmessage: null,
        postMessage: () => {}
      };
      this.port2 = {
        postMessage: function() {
          port2PostMessageCalled = true;
        }
      };
    };

    // Test that Q.nextTick properly sets up MessageChannel
    Q.nextTick(() => {
      // In the original code, port1.onmessage should be set
      // and port2.postMessage should be called
      if (port2PostMessageCalled) {
        done();
      } else {
        done(new Error("MessageChannel was not properly initialized"));
      }
    });

    // Restore original after test
    setTimeout(() => {
      (global as any).MessageChannel = originalMessageChannel;
    }, 100);
  });
});