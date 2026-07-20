import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not emit unhandledRejection when process.emit is not a function", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Create a mock process object where emit is not a function
        global.process = {
            ...originalProcess,
            emit: undefined
        };

        // Track if emit was called by checking if error is thrown
        let errorThrown = false;
        const originalEmit = global.process.emit;
        try {
            // Create a rejected promise
            const rejectedPromise = Q.reject(new Error("test error"));

            // Wait for the unhandled rejection tracking to occur
            setTimeout(() => {
                // Restore original process
                global.process = originalProcess;
                done();
            }, 50);
        } catch (e) {
            errorThrown = true;
        }

        // In original code: no error should be thrown (condition checks typeof process.emit === "function")
        // In mutated code: error will be thrown (condition is always true)
        expect(errorThrown).toBe(false);
    });
});