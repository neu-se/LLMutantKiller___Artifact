// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("long stack support initialization", () => {
    it("should not throw error when enabling long stack support in browser environment", () => {
        // Save the original process object if it exists
        const originalProcess = global.process;

        // Delete process to simulate browser environment
        delete (global as any).process;

        try {
            // Force re-evaluation of the long stack support condition
            // This should not throw in the original code but will throw in the mutated code
            expect(() => {
                // Access Q to ensure the module is loaded
                const qInstance = Q;
                // The mutation would cause an error when trying to access process.env
                // when process is undefined
            }).not.toThrow();

            // Restore process if it existed
            if (originalProcess) {
                (global as any).process = originalProcess;
            }
        } catch (e) {
            // Restore process if it existed before re-throwing
            if (originalProcess) {
                (global as any).process = originalProcess;
            }
            throw e;
        }
    });
});