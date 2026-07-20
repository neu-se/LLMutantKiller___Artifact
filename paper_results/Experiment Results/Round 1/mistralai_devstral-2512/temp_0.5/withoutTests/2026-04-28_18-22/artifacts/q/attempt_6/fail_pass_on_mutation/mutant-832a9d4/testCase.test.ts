// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick performance", () => {
  it("should execute tasks in a timely manner when MessageChannel is available", (done) => {
    const Q = qModule.default || qModule;

    // Save original MessageChannel
    const originalMessageChannel = (global as any).MessageChannel;
    let messageChannelAvailable = typeof MessageChannel !== "undefined";

    // Test execution time with and without MessageChannel
    let startTime: number;
    let endTime: number;

    startTime = Date.now();
    let counter = 0;
    const iterations = 10;

    function runTest() {
      if (counter >= iterations) {
        endTime = Date.now();
        const elapsed = endTime - startTime;

        // With MessageChannel, tasks should execute faster than setTimeout
        // This is a heuristic test that will fail if MessageChannel isn't being used
        if (messageChannelAvailable) {
          // MessageChannel should complete 10 iterations in less than 50ms
          expect(elapsed).toBeLessThan(50);
        }
        done();
        return;
      }

      counter++;
      Q.nextTick(runTest);
    }

    Q.nextTick(runTest);
  }, 100);
});