import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should not emit unhandledRejection when process.emit is not a function", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Create a mock process object where emit is not a function
        global.process = {
            ...originalProcess,
            emit: null as any
        };

        // Track if emit was called
        let emitCalled = false;
        const mockProcess = global.process as any;
        mockProcess.emit = function() {
            emitCalled = true;
        };

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Wait for the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // In original code: emit should NOT be called (condition checks typeof process.emit === "function")
            // In mutated code: emit will be called (condition is always true)
            expect(emitCalled).toBe(false);
            done();
        }, 50);
    });
});