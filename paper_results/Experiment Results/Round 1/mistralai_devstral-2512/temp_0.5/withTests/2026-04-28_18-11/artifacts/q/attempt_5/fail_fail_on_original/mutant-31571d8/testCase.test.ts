import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly build long stack traces when multiple promises reject with the same error", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a scenario where multiple promises reject with the same error
        // This tests the specific logic in makeStackTraceLong that compares stack counters
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

        // The key assertion: verify that the stack trace contains multiple frames
        // The mutation would cause the stack trace to be shorter because it would
        // always use the first promise's stack instead of comparing stack counters
        const stackLines = capturedStack!.split('\n').filter(line =>
            line.includes('.test.ts') ||
            line.includes('q.js') ||
            line.includes('Error: Test error')
        );

        // In the original code, we should have multiple stack frames
        // In the mutated code, the condition always evaluates to false
        // so only the first promise's stack would be used
        expect(stackLines.length).toBeGreaterThan(2);
    });
});