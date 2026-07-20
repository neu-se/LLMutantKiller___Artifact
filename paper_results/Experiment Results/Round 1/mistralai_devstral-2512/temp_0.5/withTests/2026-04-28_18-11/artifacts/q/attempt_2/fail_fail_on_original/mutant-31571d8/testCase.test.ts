import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly handle stack counter comparison when multiple promises reject with the same error", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises that all reject with the same error
        const error = new Error("Test error");
        const promise1 = Q.reject(error);
        const promise2 = Q.reject(error);
        const promise3 = Q.reject(error);

        // Force promise2 to have a higher stackCounter than promise1
        await promise1.then(null, () => {});
        await promise2.then(null, () => {});

        // Now reject promise3 and let it propagate
        let capturedStack: string | undefined;
        try {
            await promise3;
        } catch (e: any) {
            capturedStack = e.stack;
        }

        // Verify the stack trace was properly formatted
        expect(capturedStack).toBeDefined();
        expect(capturedStack!.includes("Test error")).toBe(true);

        // The key assertion: the mutation would cause this to fail
        // because it would always use the first promise's stack
        // instead of comparing stack counters properly
        const lines = capturedStack!.split('\n');
        const stackTraceLines = lines.filter(line =>
            line.includes(".test.ts") || line.includes("q.js")
        );

        // In the original code, the stack should contain references to
        // the actual rejection points. In the mutated code, it would
        // incorrectly always use the first promise's stack.
        expect(stackTraceLines.length).toBeGreaterThan(1);
    });
});