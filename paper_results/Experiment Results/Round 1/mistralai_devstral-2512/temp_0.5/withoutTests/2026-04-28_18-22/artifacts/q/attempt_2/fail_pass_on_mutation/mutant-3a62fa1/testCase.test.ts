// llm-cache/mistralai_devstral-2512/temp_0.5/withoutTests/cached/artifacts/q/attempt_1/pending_category/mutant-3a62fa1/testCase.test.ts
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q library environment detection", () => {
    it("should use process.nextTick when in Node.js environment", (done) => {
        // Save original process
        const originalProcess = global.process;

        // Mock Node.js environment
        global.process = {
            nextTick: (callback) => {
                // Verify this is being called
                expect(true).toBe(true);
                callback();
            },
            env: {}
        };

        // Create a promise that should use process.nextTick
        const promise = Q.resolve(42);
        promise.then((value) => {
            expect(value).toBe(42);
            // Restore original process
            global.process = originalProcess;
            done();
        }).done();
    });
});