import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString behavior", () => {
    it("should filter out internal frames from stack traces", () => {
        // Create a promise chain that will generate a stack trace
        const deferred = Q.defer();
        let capturedStack: string | undefined;

        // Force long stack traces to be enabled for this test
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            // Create a rejection that will capture the stack
            Q.nextTick(() => {
                try {
                    throw new Error("Test error");
                } catch (e) {
                    const promise = Q.reject(e);
                    // Access the stack property which triggers filterStackString
                    capturedStack = (promise as any).stack;
                    deferred.resolve(capturedStack);
                }
            });

            return deferred.promise.then((stack: string) => {
                // The stack should not contain Q library internal frames
                // when the original code is used (with !isInternalFrame)
                // but will contain them when mutated (with isInternalFrame)
                expect(stack).toBeDefined();
                // This assertion will fail with the mutated code because
                // internal frames will be included in the stack trace
                expect(stack?.includes("q.js")).toBe(false);
            });
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});