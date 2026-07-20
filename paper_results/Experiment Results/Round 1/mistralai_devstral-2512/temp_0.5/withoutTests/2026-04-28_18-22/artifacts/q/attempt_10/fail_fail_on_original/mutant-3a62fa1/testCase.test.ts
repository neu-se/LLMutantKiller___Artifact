// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library process detection", () => {
    it("should use process.nextTick only when process is a proper object with nextTick", () => {
        // Save original process
        const originalProcess = global.process;

        // Test in environment where process is null (not an object)
        global.process = null as any;

        let nextTickUsed = false;
        const originalNextTick = Q.nextTick;
        Q.nextTick = function(task: Function) {
            nextTickUsed = true;
            originalNextTick(task);
        };

        const promise = Q.resolve(42);
        return promise.then(() => {
            // In original code, should NOT use process.nextTick because process is null
            expect(nextTickUsed).toBe(false);

            // Restore original process
            global.process = originalProcess;
            Q.nextTick = originalNextTick;
        });
    });
});