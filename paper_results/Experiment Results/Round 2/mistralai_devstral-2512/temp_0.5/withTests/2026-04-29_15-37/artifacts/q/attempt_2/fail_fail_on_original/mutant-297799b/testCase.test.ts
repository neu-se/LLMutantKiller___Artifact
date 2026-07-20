import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isInternalFrame mutation detection", () => {
    it("should correctly identify internal stack frames", () => {
        // Create a mock stack line that should be considered internal
        const internalStackLine = "at someFunction (q.js:123:45)";

        // Create a mock stack line that should NOT be considered internal
        const externalStackLine = "at userCode (app.js:42:10)";

        // The original code should return true for internal frames (containing q.js)
        // and false for external frames (not containing q.js)
        // The mutation always returns true, which would incorrectly mark external frames as internal

        // We need to test the actual behavior through the public API
        // Since isInternalFrame is not directly exposed, we test it indirectly
        // through the stack trace filtering mechanism

        // Force long stack traces to be enabled
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        const error = new Error("Test error");

        // Add some depth to create stack frames
        const promise = deferred.promise
            .then(() => { throw error; })
            .then(() => { throw error; });

        // Reject the promise to trigger stack trace generation
        deferred.reject(error);

        // The stack trace should be filtered by isInternalFrame
        // In the original code, external frames should remain
        // In the mutated code, all frames would be filtered out
        return promise.catch((e: Error) => {
            // Check that we have a stack trace
            expect(e.stack).toBeDefined();

            // The stack should contain our external frame marker
            // If the mutation is present, this would be filtered out
            expect(e.stack).toContain("app.js");
        });
    });
});