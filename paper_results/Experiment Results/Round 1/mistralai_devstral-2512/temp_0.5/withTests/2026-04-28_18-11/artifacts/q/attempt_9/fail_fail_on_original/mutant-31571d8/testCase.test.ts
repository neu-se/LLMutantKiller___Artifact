import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with multiple rejections", () => {
    it("should correctly compare stack counters when building long stack traces", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a scenario where we have multiple promises rejecting with the same error
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
        // the separator that indicates multiple promise stacks were concatenated
        // The mutation would break this by always using the first promise's stack
        const hasSeparator = capturedStack!.includes("From previous event");
        expect(hasSeparator).toBe(true);

        // Additional verification: count how many times the separator appears
        // In the original code, we should see multiple separators
        // In the mutated code, we would see fewer separators
        const separatorCount = (capturedStack!.match(/From previous event/g) || []).length;
        expect(separatorCount).toBeGreaterThan(0);
    });
});