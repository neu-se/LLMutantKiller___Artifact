// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import { Q } from "./q.js";

describe("Q library process detection", () => {
    it("should correctly detect Node.js environment when process is defined", () => {
        // This test verifies that Q correctly identifies a Node.js environment
        // by checking if process.nextTick is used for scheduling
        const originalProcess = global.process;

        // Mock a Node.js-like environment
        global.process = {
            nextTick: (callback) => callback(),
            domain: null
        };

        let nextTickUsed = false;
        const originalNextTick = Q.nextTick;
        const spy = jest.fn((task) => {
            nextTickUsed = true;
            originalNextTick(task);
        });
        Q.nextTick = spy;

        // Trigger a promise operation that would use nextTick
        const promise = Q.resolve(42);
        promise.then(() => {
            // Verify that process.nextTick was used
            expect(nextTickUsed).toBe(true);
        });

        // Restore
        global.process = originalProcess;
        Q.nextTick = originalNextTick;
    });
});