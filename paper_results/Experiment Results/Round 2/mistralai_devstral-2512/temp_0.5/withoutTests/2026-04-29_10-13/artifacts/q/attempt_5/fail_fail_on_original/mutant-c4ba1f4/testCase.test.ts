// Test to detect the mutation in the Q library's nextTick implementation
import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.nextTick behavior with setImmediate", () => {
    it("should use setImmediate when available for scheduling tasks", (done) => {
        // Store original setImmediate if it exists
        const originalSetImmediate = global.setImmediate;
        let setImmediateUsed = false;

        // Mock setImmediate to track if it's being used
        global.setImmediate = function(callback: (...args: any[]) => void) {
            setImmediateUsed = true;
            // Call the callback in next tick to simulate setImmediate behavior
            process.nextTick(callback);
        };

        try {
            // Create a promise that should use setImmediate for scheduling
            let resolved = false;
            Q(undefined).then(() => {
                resolved = true;
            });

            // Give some time for the promise to resolve
            setTimeout(() => {
                // Restore original setImmediate
                global.setImmediate = originalSetImmediate;

                // In the original code, setImmediate should have been called
                // In the mutated code, it won't be called
                expect(setImmediateUsed).toBe(true);
                expect(resolved).toBe(true);
                done();
            }, 100);
        } catch (error) {
            // Restore original setImmediate in case of error
            global.setImmediate = originalSetImmediate;
            done(error);
        }
    });
});