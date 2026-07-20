// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel configuration", () => {
  it("should properly configure MessageChannel when available", (done) => {
    const Q = qModule.default || qModule;

    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;
    let port1OnMessageSet = false;
    let port2PostMessageCalled = false;

    // Mock MessageChannel with tracking
    (global as any).MessageChannel = class {
      port1 = {
        onmessage: null,
        postMessage: jest.fn()
      };
      port2 = {
        postMessage: () => {
          port2PostMessageCalled = true;
          // Simulate message delivery
          if (this.port1.onmessage) {
            this.port1.onmessage({ data: 0 });
          }
        }
      };
    };

    // Force re-evaluation of nextTick
    const nextTick = Q.nextTick;

    // Test that MessageChannel is properly configured
    let taskExecuted = false;
    nextTick(() => {
      taskExecuted = true;
    });

    // Check configuration
    setTimeout(() => {
      expect(taskExecuted).toBe(true);
      expect(port2PostMessageCalled).toBe(true);

      // Restore
      (global as any).MessageChannel = originalMessageChannel;
      done();
    }, 50);
  });
});