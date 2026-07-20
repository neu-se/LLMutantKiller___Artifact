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

            // Count occurrences of q.js in the stack trace
            // The original code should filter out most q.js frames
            // The mutated code will leave more q.js frames in the stack
            const qjsMatches = errorStack ? errorStack.match(/q\.js/g) || [] : [];
            const qjsCount = qjsMatches.length;

            // With the original code, we expect fewer q.js frames (filtered)
            // With the mutated code, we expect more q.js frames (not filtered)
            // This threshold may need adjustment based on actual behavior
            expect(qjsCount).toBeLessThan(5);
        });
    });
});