// llm-cache/mistralai_devstral-2512/temp_0.5/withTests/cached/artifacts/q/attempt_1/pending_category/mutant-3310a58/testCase.test.ts
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack support in browser environment", () => {
    it("should not throw error when process is undefined", () => {
        // Save the original process object if it exists
        const originalProcess = global.process;

        // Delete process to simulate browser environment
        delete global.process;

        try {
            // This should not throw in the original code but will throw in the mutated code
            // because the mutated code tries to access process.env when process is undefined
            expect(() => {
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