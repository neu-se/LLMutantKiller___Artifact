// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
    it("should use process.nextTick only in Node.js environment", () => {
        // Save original process
        const originalProcess = global.process;

        // Test in non-Node.js environment (browser-like)
        delete (global as any).process;

        // Track which scheduling mechanism is used
        let schedulingMechanism = "unknown";
        const originalNextTick = Q.nextTick;

        // Override nextTick to detect if it's being used
        Q.nextTick = function(task: Function) {
            schedulingMechanism = "process.nextTick";
            originalNextTick(task);
        };

        // Create a promise that should NOT use process.nextTick in non-Node environment
        const promise = Q.resolve(42);

        return promise.then(() => {
            // In non-Node environment, should NOT use process.nextTick
            expect(schedulingMechanism).not.toBe("process.nextTick");

            // Restore original process
            global.process = originalProcess;
            Q.nextTick = originalNextTick;
        });
    });
});