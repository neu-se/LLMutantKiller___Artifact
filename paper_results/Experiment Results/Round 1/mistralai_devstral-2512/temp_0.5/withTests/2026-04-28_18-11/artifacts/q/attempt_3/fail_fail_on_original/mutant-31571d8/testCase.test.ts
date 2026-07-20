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

        // The key assertion: verify that the error object has the correct
        // minimum stack counter set by examining the internal property
        // This directly tests the behavior affected by the mutation
        expect((error as any).__minimumStackCounter__).toBeDefined();
        expect((error as any).__minimumStackCounter__).toBeGreaterThan(0);

        // In the mutated code, the condition always evaluates to false
        // because of `|| false`, so __minimumStackCounter__ would never
        // get updated beyond the first promise
        expect((error as any).__minimumStackCounter__).toBeLessThan(3);
    });
});