// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library process detection", () => {
    it("should correctly identify Node.js environment based on process object", () => {
        // Save original process
        const originalProcess = global.process;

        // Test 1: Verify it works in Node.js environment
        global.process = {
            nextTick: (callback: Function) => callback(),
            env: {},
            domain: null
        } as any;

        let nextTickUsed = false;
        const originalNextTick = Q.nextTick;
        Q.nextTick = function(task: Function) {
            nextTickUsed = true;
            originalNextTick(task);
        };

        const promise1 = Q.resolve(42);
        return promise1.then(() => {
            expect(nextTickUsed).toBe(true);
        }).then(() => {
            // Test 2: Verify it doesn't use process.nextTick when process is not defined
            nextTickUsed = false;
            global.process = undefined as any;

            const promise2 = Q.resolve(42);
            return promise2.then(() => {
                // In non-Node environment, should use fallback (setTimeout)
                expect(nextTickUsed).toBe(false);
            });
        }).finally(() => {
            global.process = originalProcess;
            Q.nextTick = originalNextTick;
        });
    });
});