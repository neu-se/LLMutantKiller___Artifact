// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_6/pending_category/mutant-832a9d4/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("MessageChannel fallback behavior", () => {
  it("should use MessageChannel when available for efficient async execution", (done) => {
    // Save original setTimeout to detect fallback usage
    const originalSetTimeout = setTimeout;
    let setTimeoutCalled = false;
    (global as any).setTimeout = (fn: () => void, delay: number) => {
      if (delay === 0) {
        setTimeoutCalled = true;
      }
      return originalSetTimeout(fn, delay);
    };

    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to be available
    (global as any).MessageChannel = function() {
      this.port1 = {
        onmessage: function() {
          // Verify setTimeout wasn't called (meaning MessageChannel was used)
          if (setTimeoutCalled) {
            done(new Error("setTimeout was used instead of MessageChannel"));
          }
        },
        postMessage: () => {}
      };
      this.port2 = {
        postMessage: () => {}
      };
    };

    // Test execution
    Q.nextTick(() => {
      // Restore originals
      (global as any).setTimeout = originalSetTimeout;
      (global as any).MessageChannel = originalMessageChannel;

      if (!setTimeoutCalled) {
        done();
      } else {
        done(new Error("MessageChannel was not properly utilized"));
      }
    });
  });
});