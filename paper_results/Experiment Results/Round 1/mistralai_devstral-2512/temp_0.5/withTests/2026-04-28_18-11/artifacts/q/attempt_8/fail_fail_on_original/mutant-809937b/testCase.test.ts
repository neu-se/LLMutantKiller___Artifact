import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should check process.emit type correctly before emitting", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Create a mock process where emit is not a function
        global.process = {
            ...originalProcess,
            emit: "not a function"
        };

        // Track if emit was called
        let emitCalled = false;
        const mockProcess = global.process as any;
        const originalEmit = mockProcess.emit;
        mockProcess.emit = function() {
            emitCalled = true;
            return originalEmit;
        };

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Wait for the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // In original code: emit should NOT be called (typeof check fails)
            // In mutated code: emit will be called (condition is always true)
            expect(emitCalled).toBe(false);
            done();
        }, 50);
    });
});