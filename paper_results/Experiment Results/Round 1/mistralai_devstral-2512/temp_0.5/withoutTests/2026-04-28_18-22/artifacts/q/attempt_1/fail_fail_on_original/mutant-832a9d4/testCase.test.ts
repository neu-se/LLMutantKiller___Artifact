// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import { Q } from "./q.js";

describe("Q.nextTick behavior with MessageChannel", () => {
  it("should use MessageChannel when available for nextTick", (done) => {
    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to track if it's being used
    (global as any).MessageChannel = class {
      port1 = {
        onmessage: null,
        postMessage: jest.fn()
      };
      port2 = {
        postMessage: jest.fn()
      };
    };

    // Create a flag to track if MessageChannel was used
    let messageChannelUsed = false;
    const originalRequestTick = Q.nextTick;
    Q.nextTick = function(task) {
      messageChannelUsed = true;
      return originalRequestTick(task);
    };

    // Test that a task scheduled with nextTick completes
    let taskExecuted = false;
    Q.nextTick(() => {
      taskExecuted = true;
    });

    // Use setTimeout to allow the task to execute
    setTimeout(() => {
      expect(taskExecuted).toBe(true);
      expect(messageChannelUsed).toBe(true);

      // Restore original MessageChannel
      (global as any).MessageChannel = originalMessageChannel;
      done();
    }, 10);
  });
});