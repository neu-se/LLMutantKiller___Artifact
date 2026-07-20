// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library process detection", () => {
    it("should correctly detect Node.js environment based on process object", () => {
        // Save original process
        const originalProcess = global.process;

        // Test in environment where process exists but is not a proper Node.js process
        global.process = {
            nextTick: (callback: Function) => callback(),
            env: {}
            // Note: intentionally missing 'domain' property
        } as any;

        let nextTickUsed = false;
        const originalNextTick = Q.nextTick;
        Q.nextTick = function(task: Function) {
            nextTickUsed = true;
            originalNextTick(task);
        };

        const promise = Q.resolve(42);
        return promise.then(() => {
            // In original code, should use process.nextTick even without domain property
            // because the check is only for typeof process === "object"
            expect(nextTickUsed).toBe(true);

            // Restore original process
            global.process = originalProcess;
            Q.nextTick = originalNextTick;
        });
    });
});