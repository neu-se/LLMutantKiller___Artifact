import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly handle stack counter comparison when multiple promises reject with the same error", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a scenario where we have multiple promises rejecting with the same error
        // This specifically tests the logic in makeStackTraceLong that compares stack counters
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
        // the "From previous event" separator which indicates that
        // multiple promise stacks were concatenated
        // The mutation would break this by always using the first promise's stack
        expect(capturedStack!.includes("From previous event")).toBe(true);

        // Additional check: verify the stack has multiple frames
        const stackLines = capturedStack!.split('\n').filter(line =>
            line.includes('.test.ts') || line.includes('q.js')
        );
        expect(stackLines.length).toBeGreaterThan(1);
    });
});