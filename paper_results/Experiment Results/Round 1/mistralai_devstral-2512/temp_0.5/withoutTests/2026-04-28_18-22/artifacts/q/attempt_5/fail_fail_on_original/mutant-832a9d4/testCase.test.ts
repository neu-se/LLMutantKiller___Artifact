// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick with MessageChannel detection", () => {
  it("should detect and use MessageChannel when available", (done) => {
    const Q = qModule.default || qModule;

    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;
    let messageChannelUsed = false;

    // Mock MessageChannel to track usage
    (global as any).MessageChannel = class {
      constructor() {
        messageChannelUsed = true;
      }
      port1 = {
        onmessage: null,
        postMessage: jest.fn()
      };
      port2 = {
        postMessage: jest.fn()
      };
    };

    // Force re-evaluation of nextTick implementation
    const nextTick = Q.nextTick;

    // Test that MessageChannel is used
    let taskExecuted = false;
    nextTick(() => {
      taskExecuted = true;
    });

    // Check after a short delay
    setTimeout(() => {
      expect(taskExecuted).toBe(true);
      expect(messageChannelUsed).toBe(true);

      // Restore original MessageChannel
      (global as any).MessageChannel = originalMessageChannel;
      done();
    }, 50);
  });
});