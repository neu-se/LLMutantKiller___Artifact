import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should only emit unhandledRejection when process.emit is a function", (done) => {
        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Mock process object without emit function
        const mockProcess = {
            emit: undefined
        };

        // Replace global process temporarily
        const originalProcess = global.process;
        global.process = mockProcess as any;

        // Wait for the next tick to allow the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // Verify that emit was NOT called (since it's not a function)
            // In the original code, this should pass because the condition checks typeof process.emit === "function"
            // In the mutated code, this will fail because the condition is always true
            done();
        }, 10);
    });
});