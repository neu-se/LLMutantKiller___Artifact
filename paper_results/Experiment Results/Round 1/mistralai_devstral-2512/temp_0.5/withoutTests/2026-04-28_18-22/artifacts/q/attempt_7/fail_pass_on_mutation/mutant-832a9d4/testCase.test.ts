// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-832a9d4/testCase.test.ts
import * as qModule from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick MessageChannel usage", () => {
  it("should use MessageChannel when available for faster execution", (done) => {
    const Q = qModule.default || qModule;

    // Save original MessageChannel and setImmediate
    const originalMessageChannel = (global as any).MessageChannel;
    const originalSetImmediate = global.setImmediate;

    // Mock MessageChannel to be available
    (global as any).MessageChannel = class {
      port1 = {
        onmessage: null,
        postMessage: jest.fn()
      };
      port2 = {
        postMessage: jest.fn()
      };
    };

    // Make setImmediate unavailable to force MessageChannel usage
    delete (global as any).setImmediate;

    // Track execution time
    const startTime = Date.now();
    let executionCount = 0;
    const targetCount = 5;

    function testTask() {
      executionCount++;
      if (executionCount >= targetCount) {
        const elapsed = Date.now() - startTime;
        // With MessageChannel, 5 tasks should complete in under 20ms
        expect(elapsed).toBeLessThan(20);
        done();
        return;
      }
      Q.nextTick(testTask);
    }

    // Start the test
    Q.nextTick(testTask);

    // Restore originals after test completes
    setTimeout(() => {
      (global as any).MessageChannel = originalMessageChannel;
      global.setImmediate = originalSetImmediate;
    }, 100);
  }, 100);
});