// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library process detection", () => {
    it("should correctly detect Node.js environment", () => {
        // Save original process
        const originalProcess = global.process;

        // Mock a proper Node.js environment
        global.process = {
            nextTick: (callback: Function) => callback(),
            env: {},
            // Add domain property to match Node.js environment
            domain: null
        } as any;

        // Track which scheduling mechanism is used
        let schedulingMechanism = "unknown";
        const originalNextTick = Q.nextTick;

        // Override nextTick to detect if it's being used
        Q.nextTick = function(task: Function) {
            schedulingMechanism = "process.nextTick";
            originalNextTick(task);
        };

        // Create a promise that should trigger scheduling
        const promise = Q.resolve(42);

        return promise.then(() => {
            // In original code, should use process.nextTick in Node.js environment
            expect(schedulingMechanism).toBe("process.nextTick");

            // Restore original process
            global.process = originalProcess;
            Q.nextTick = originalNextTick;
        });
    });
});