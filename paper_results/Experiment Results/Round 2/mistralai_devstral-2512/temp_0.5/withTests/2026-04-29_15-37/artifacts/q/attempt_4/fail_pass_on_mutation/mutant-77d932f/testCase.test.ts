// Test case to detect the mutation in getFileNameAndLineNumber function
const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("getFileNameAndLineNumber mutation test", () => {
    it("should properly parse stack traces to filter internal frames", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const deferred = Q.defer();
        const promise = deferred.promise.then(() => {
            return Q.Promise((resolve: any, reject: any) => {
                setTimeout(() => {
                    reject(new Error("Test error"));
                }, 0);
            });
        });

        // Set up error handling
        let errorStack: string | undefined;
        promise.done(null, (error: any) => {
            errorStack = error.stack;
        });

        // Trigger the error
        deferred.resolve();

        // Wait for the error to be processed
        return Q.delay(50).then(() => {
            // The error should have a stack trace
            expect(errorStack).toBeDefined();

            // Check that stack trace filtering occurred
            // The original code should filter internal frames, while the mutated code won't
            // We look for the "From previous event" separator which indicates filtering
            const hasFilteringSeparator = errorStack && errorStack.includes('From previous event:');
            expect(hasFilteringSeparator).toBe(true);
        });
    });
});