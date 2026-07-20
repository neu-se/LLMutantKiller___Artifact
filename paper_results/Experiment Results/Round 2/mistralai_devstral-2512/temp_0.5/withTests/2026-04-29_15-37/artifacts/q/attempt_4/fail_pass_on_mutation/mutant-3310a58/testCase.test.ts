// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should handle missing process.env gracefully when module is loaded", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Delete process to simulate browser environment
        delete (global as any).process;

        try {
            // Clear the module cache to force reloading
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

            // This should work in original code but fail in mutated code
            // when trying to access process.env.Q_DEBUG
            expect(() => {
                const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
                Q.longStackSupport = true;
            }).not.toThrow();

            // Restore process if it existed
            if (originalProcess) {
                global.process = originalProcess;
            }
        } catch (e) {
            // Restore process if it existed before re-throwing
            if (originalProcess) {
                global.process = originalProcess;
            }
            throw e;
        }
    });
});