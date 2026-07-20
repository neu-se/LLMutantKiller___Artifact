import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("trackRejection process.emit guard", () => {
    it("should not throw when process.emit is not a function", (done) => {
        const originalEmit = process.emit;
        // Replace process.emit with a non-function to test the guard condition
        (process as any).emit = "not-a-function";

        Q.resetUnhandledRejections();

        let errorThrown = false;
        const originalOnerror = Q.onerror;

        try {
            // Creating a rejected promise triggers trackRejection
            // Original code: && means it skips the block if emit is not a function
            // Mutated code: || means it enters the block and tries to call process.emit(), throwing
            Q.reject(new Error("test rejection"));
        } catch (e) {
            errorThrown = true;
        }

        // Restore process.emit
        process.emit = originalEmit;

        // Give async operations a chance to run
        setTimeout(() => {
            expect(errorThrown).toBe(false);
            // Clean up unhandled rejections
            Q.resetUnhandledRejections();
            done();
        }, 50);
    });
});