import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly handle stack counter comparison when multiple promises reject with the same error", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises that all reject with the same error
        const error = new Error("Test error");

        // Create promises in sequence to ensure different stack counters
        const promise1 = Q.reject(error);
        await promise1.then(null, () => {});

        const promise2 = Q.reject(error);
        await promise2.then(null, () => {});

        // Create third promise that will be the one we examine
        const promise3 = Q.reject(error);

        // Capture the stack trace
        let capturedStack: string | undefined;
        try {
            await promise3;
        } catch (e: any) {
            capturedStack = e.stack;
        }

        // Verify the stack trace contains the expected error message
        expect(capturedStack).toBeDefined();
        expect(capturedStack!.includes("Test error")).toBe(true);

        // The key assertion: verify that the stack trace contains
        // "From previous event" separator which indicates long stack traces
        // are working correctly. The mutation would break this behavior.
        expect(capturedStack!.includes("From previous event")).toBe(true);
    });
});