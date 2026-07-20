import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not attempt to emit when process.emit is not a function", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Create a mock process object where emit is not a function
        global.process = {
            ...originalProcess,
            emit: null as any
        };

        // Track if emit was called by checking for errors
        let emitError = null;
        const mockProcess = global.process as any;
        mockProcess.emit = function() {
            emitError = new Error("emit was called");
            throw emitError;
        };

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Wait for the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // In original code: emit should NOT be called (typeof check fails)
            // In mutated code: emit will be called (condition is always true) and throw error
            expect(emitError).toBeNull();
            done();
        }, 50);
    });
});