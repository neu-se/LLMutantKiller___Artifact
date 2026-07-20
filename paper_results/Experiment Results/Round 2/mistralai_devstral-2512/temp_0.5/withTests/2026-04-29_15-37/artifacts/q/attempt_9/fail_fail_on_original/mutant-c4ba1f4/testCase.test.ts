// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick setImmediate fallback detection", () => {
    it("should detect when setImmediate fallback is missing", () => {
        // This test verifies that Q.nextTick uses setImmediate when available
        // by checking the internal implementation details through behavior

        // In Node.js environment, process.nextTick is available
        // The original code should use setImmediate if available
        // The mutated code skips this branch entirely

        // We can detect this by checking if tasks are scheduled via setImmediate
        // by overriding it temporarily
        const originalSetImmediate = global.setImmediate;
        let setImmediateUsed = false;

        if (typeof originalSetImmediate === 'function') {
            global.setImmediate = function(callback: Function, ...args: any[]) {
                setImmediateUsed = true;
                return originalSetImmediate(callback, ...args);
            };

            // Force Q to re-evaluate its nextTick implementation
            // by creating a new deferred object which uses nextTick
            const deferred = Q.defer();
            deferred.resolve();

            // Restore original setImmediate
            global.setImmediate = originalSetImmediate;

            // In original code, setImmediate should have been used
            // In mutated code, it won't be used because the branch is removed
            if (!setImmediateUsed) {
                throw new Error("setImmediate fallback not detected - mutation present");
            }
        } else {
            // If setImmediate isn't available, we can't test this
            console.log("setImmediate not available in this environment - skipping test");
        }
    });
});