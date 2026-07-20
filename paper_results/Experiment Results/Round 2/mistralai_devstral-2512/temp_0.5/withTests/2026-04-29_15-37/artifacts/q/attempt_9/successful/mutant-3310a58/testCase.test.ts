// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
describe("Q module initialization", () => {
    it("should initialize without errors in browser environment", () => {
        // Save the original process object
        const originalProcess = global.process;

        // Delete process to simulate browser environment
        delete (global as any).process;

        try {
            // Clear the module cache to force reloading
            delete require.cache[require.resolve("../../../../../../../../../../../subject_repositories/q/q.js")];

            // This should work in original code but fail in mutated code
            expect(() => {
                const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");
                // Just loading the module should be enough to trigger the initialization code
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