import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly handle stack counter comparison when multiple promises reject with the same error", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises that all reject with the same error
        const error = new Error("Test error");

        // Create first promise and let it reject
        const promise1 = Q.reject(error);
        await promise1.then(null, () => {});

        // Create second promise with higher stack counter
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

        // Verify the stack trace was properly formatted
        expect(capturedStack).toBeDefined();
        expect(capturedStack!.includes("Test error")).toBe(true);

        // The key assertion: verify that the stack trace contains
        // multiple occurrences of the error message, indicating that
        // the long stack trace was properly built by concatenating
        // multiple promise stacks
        const errorOccurrences = (capturedStack!.match(/Test error/g) || []).length;
        expect(errorOccurrences).toBeGreaterThan(1);
    });
});