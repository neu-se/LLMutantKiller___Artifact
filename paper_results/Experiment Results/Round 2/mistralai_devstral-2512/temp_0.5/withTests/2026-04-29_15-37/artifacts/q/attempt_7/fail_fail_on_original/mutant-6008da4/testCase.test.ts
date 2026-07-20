// Test case to detect the mutation in q.js where isNodeJS is incorrectly set to true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
    it("should correctly detect non-NodeJS environment and use setTimeout", () => {
        // The mutation incorrectly sets isNodeJS = true, which would cause the code to try using process.nextTick
        // In a non-NodeJS environment, process.nextTick doesn't exist, so this should throw an error

        // Store the original process object if it exists
        const originalProcess = global.process;

        try {
            // Remove process from global to simulate non-NodeJS environment
            (global as any).process = undefined;

            // This should work fine in original code (uses setTimeout)
            // But should fail in mutated code (tries to use process.nextTick)
            return new Promise<void>((resolve, reject) => {
                try {
                    // Use Q.delay with proper arguments
                    Q.delay(undefined, 10).then(() => {
                        // If we get here, the test passed
                        resolve();
                    }).catch((e: any) => {
                        // If we get an error, the test failed
                        reject(e);
                    });
                } catch (e: any) {
                    // If we get an error, the test failed
                    reject(e);
                }
            });
        } finally {
            // Restore original process object
            if (originalProcess) {
                (global as any).process = originalProcess;
            }
        }
    });
});