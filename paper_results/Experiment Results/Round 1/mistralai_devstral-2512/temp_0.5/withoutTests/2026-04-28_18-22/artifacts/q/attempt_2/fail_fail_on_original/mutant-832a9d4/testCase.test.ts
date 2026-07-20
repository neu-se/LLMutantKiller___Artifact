// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick with MessageChannel", () => {
  it("should execute tasks asynchronously when MessageChannel is available", (done) => {
    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;

    // Mock MessageChannel to verify it's being used
    let messageChannelCreated = false;
    (global as any).MessageChannel = class {
      constructor() {
        messageChannelCreated = true;
      }
      port1 = {
        onmessage: null,
        postMessage: jest.fn()
      };
      port2 = {
        postMessage: jest.fn()
      };
    };

    // Test that nextTick uses MessageChannel when available
    let executionOrder: string[] = [];
    executionOrder.push("before");

    Q.nextTick(() => {
      executionOrder.push("tick");
    });

    executionOrder.push("after");

    // Use setTimeout to allow the nextTick to execute
    setTimeout(() => {
      expect(executionOrder).toEqual(["before", "after", "tick"]);
      expect(messageChannelCreated).toBe(true);

      // Restore original MessageChannel
      (global as any).MessageChannel = originalMessageChannel;
      done();
    }, 10);
  });
});