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
        // multiple frames from different promises
        // The mutation would cause the stack trace to be shorter
        const stackLines = capturedStack!.split('\n');
        const promiseFrames = stackLines.filter(line =>
            line.includes('at ') && !line.includes('Error: Test error')
        );

        // In the original code, we should have multiple stack frames
        // In the mutated code, the condition always evaluates to false
        // so only the first promise's stack would be used
        expect(promiseFrames.length).toBeGreaterThan(2);
    });
});