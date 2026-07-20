// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should handle process.env access correctly", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Create a mock process object with env but no Q_DEBUG
        (global as any).process = {
            toString: () => "[object process]",
            env: {} // Empty env object
        };

        try {
            // Clear the module cache to force reloading
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

            // This should work in original code but fail in mutated code
            expect(() => {
                const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
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