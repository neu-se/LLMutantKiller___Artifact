// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with MessageChannel", () => {
  it("should execute tasks asynchronously", (done) => {
    const Q = qModule.default || qModule;

    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;
    let messageChannelUsed = false;

    // Mock MessageChannel to track if it's being instantiated
    (global as any).MessageChannel = class {
      constructor() {
        messageChannelUsed = true;
      }
      port1 = { onmessage: null };
      port2 = { postMessage: () => {} };
    };

    // Test basic async execution
    let executionOrder: string[] = [];
    executionOrder.push("start");

    Q.nextTick(() => {
      executionOrder.push("tick1");
      Q.nextTick(() => {
        executionOrder.push("tick2");
        expect(executionOrder).toEqual(["start", "end", "tick1", "tick2"]);
        done();
      });
    });

    executionOrder.push("end");
  });
});