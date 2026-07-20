// Test case to detect the mutation in getFileNameAndLineNumber function
import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("getFileNameAndLineNumber mutation test", () => {
    it("should properly parse stack traces to filter internal frames", () => {
        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        const promise = deferred.promise.then(() => {
            throw new Error("Test error");
        });

        // Set up error handling
        let errorStack: string | undefined;
        promise.done(null, (error: any) => {
            errorStack = error.stack;
        });

        // Trigger the error
        deferred.resolve();

        // Wait for the error to be processed
        return Q.delay(10).then(() => {
            // The error should have a stack trace
            expect(errorStack).toBeDefined();

            // Check that stack trace filtering occurred
            // The original code should filter internal frames, while the mutated code won't
            const hasInternalFiltering = errorStack && !errorStack.includes('q.js');
            expect(hasInternalFiltering).toBe(true);
        });
    });
});