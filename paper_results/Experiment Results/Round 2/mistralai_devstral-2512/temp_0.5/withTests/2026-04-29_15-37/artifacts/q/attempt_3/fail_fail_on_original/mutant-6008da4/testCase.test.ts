// Test case to detect the mutation in q.js where isNodeJS is incorrectly set to true
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("NodeJS environment detection", () => {
    it("should correctly detect non-NodeJS environment and not use process.nextTick", () => {
        // The mutation incorrectly sets isNodeJS = true, which would cause the code to try using process.nextTick
        // In a non-NodeJS environment, process.nextTick doesn't exist, so this should throw an error

        // Store the original process object if it exists
        const originalProcess = global.process;

        // Remove process from global to simulate non-NodeJS environment
        delete global.process;

        try {
            // This should work fine in original code (uses setTimeout)
            // But should fail in mutated code (tries to use process.nextTick)
            const deferred = Q.defer();
            let resolved = false;

            Q.nextTick(() => {
                resolved = true;
            });

            // In original code, this will work with setTimeout
            // In mutated code, this will throw an error because process.nextTick doesn't exist
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (resolved) {
                        resolve();
                    } else {
                        reject(new Error("nextTick didn't execute"));
                    }
                }, 10);
            });
        } finally {
            // Restore original process object
            if (originalProcess) {
                global.process = originalProcess;
            }
        }
    });
});