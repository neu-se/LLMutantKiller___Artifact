// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-c4ba1f4/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("Q.nextTick setImmediate detection", () => {
    it("should detect when setImmediate is not being used as fallback", () => {
        // This test verifies that Q.nextTick uses setImmediate when available
        // by checking the type of the requestTick function

        // Get access to the internal nextTick implementation
        const nextTick = Q.nextTick;

        // In the original code, when setImmediate is available, requestTick should be
        // a function that uses setImmediate
        // In the mutated code, this branch is removed, so it will skip to MessageChannel
        // or setTimeout

        // We can detect this by checking if setImmediate is being used
        const originalSetImmediate = global.setImmediate;
        let setImmediateCalled = false;

        // Override setImmediate to detect if it's called
        global.setImmediate = function(...args) {
            setImmediateCalled = true;
            return originalSetImmediate.apply(this, args);
        };

        // Force re-initialization of nextTick to trigger the detection
        const reinitNextTick = (function() {
            // This is a simplified version of the nextTick initialization logic
            let requestTick;
            if (typeof process === "object" &&
                process.toString() === "[object process]" && process.nextTick) {
                // Node.js environment - not relevant for setImmediate test
            } else if (typeof setImmediate === "function") {
                // This is the branch that gets removed in the mutation
                requestTick = function() {
                    setImmediate(flush);
                };
            }
            return requestTick;
        })();

        // Restore original setImmediate
        global.setImmediate = originalSetImmediate;

        // In original code, setImmediateCalled should be true
        // In mutated code, it will be false because the branch is removed
        if (!setImmediateCalled) {
            throw new Error("setImmediate fallback not being used - mutation detected");
        }
    });
});