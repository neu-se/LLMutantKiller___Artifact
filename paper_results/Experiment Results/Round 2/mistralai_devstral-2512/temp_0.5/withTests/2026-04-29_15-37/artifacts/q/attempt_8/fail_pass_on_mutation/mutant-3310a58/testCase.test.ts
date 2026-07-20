// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should not throw when process is undefined", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Delete process to simulate browser environment
        delete (global as any).process;

        try {
            // Force re-evaluation of the long stack support condition
            // This should work in original code but throw in mutated code
            expect(() => {
                // The mutation will try to access process.env when process is undefined
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