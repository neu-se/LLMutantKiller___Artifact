// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should handle missing process.env gracefully", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Create a mock process object without env
        (global as any).process = { toString: () => "[object process]" };

        try {
            // Force re-evaluation of the long stack support condition
            // This should work in original code but fail in mutated code
            expect(() => {
                // The mutation will try to access process.env.Q_DEBUG
                // when process.env is undefined, causing a TypeError
                Q.longStackSupport = true;
            }).not.toThrow();

            // Restore original process
            if (originalProcess) {
                global.process = originalProcess;
            } else {
                delete (global as any).process;
            }
        } catch (e) {
            // Restore process before re-throwing
            if (originalProcess) {
                global.process = originalProcess;
            } else {
                delete (global as any).process;
            }
            throw e;
        }
    });
});