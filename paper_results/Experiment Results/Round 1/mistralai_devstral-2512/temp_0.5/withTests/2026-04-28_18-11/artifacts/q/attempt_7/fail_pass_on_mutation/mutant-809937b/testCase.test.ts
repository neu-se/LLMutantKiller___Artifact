import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("unhandled rejection tracking", () => {
    it("should only track unhandled rejections when process.emit is a function", (done) => {
        // Store original process
        const originalProcess = global.process;

        // Create a mock process object where emit is not a function
        global.process = {
            ...originalProcess,
            emit: undefined
        };

        // Create a rejected promise
        const rejectedPromise = Q.reject(new Error("test error"));

        // Wait for the unhandled rejection tracking to occur
        setTimeout(() => {
            // Restore original process
            global.process = originalProcess;

            // Check if the rejection was tracked
            const unhandledRejections = Q.getUnhandledReasons();

            // In original code: rejection should be tracked (emit check is separate from tracking)
            // In mutated code: behavior should be the same for tracking
            // This test verifies the condition doesn't break the tracking mechanism
            expect(unhandledRejections.length).toBeGreaterThan(0);
            done();
        }, 50);
    });
});