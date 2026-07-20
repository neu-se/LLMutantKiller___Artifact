import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation test", () => {
    it("should correctly filter internal stack frames based on line numbers", () => {
        // Create a scenario where we can observe stack trace filtering behavior
        // This test relies on the fact that the mutation changes the condition
        // from checking line numbers to always returning true
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        let errorWithStack: Error | null = null;

        // Create a promise chain that will generate a stack trace
        const promise = Q.Promise<void>((resolve, reject) => {
            try {
                // Force a stack trace to be captured
                throw new Error("Test error");
            } catch (e) {
                errorWithStack = e as Error;
                reject(e);
            }
        });

        // The mutation would cause all frames to be considered internal
        // which would result in an empty or incorrectly filtered stack trace
        return promise.catch((e: Error) => {
            // In the original code, the stack should contain some frames
            // In the mutated code, all frames might be filtered out
            expect(e.stack).toBeTruthy();
            expect(e.stack?.length).toBeGreaterThan(0);

            // The original code should preserve some stack frames
            // The mutated code might filter them all out
            const stackLines = e.stack?.split('\n') || [];
            expect(stackLines.length).toBeGreaterThan(1);
        }).finally(() => {
            Q.longStackSupport = originalLongStackSupport;
        });
    });
});