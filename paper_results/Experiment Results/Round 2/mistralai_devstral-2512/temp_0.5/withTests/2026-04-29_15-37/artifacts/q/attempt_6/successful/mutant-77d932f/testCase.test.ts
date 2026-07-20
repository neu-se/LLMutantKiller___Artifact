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

            // Check for specific stack trace patterns that indicate proper filtering
            // The original code should properly identify and filter internal frames
            const stackLines = errorStack!.split('\n');

            // Look for lines that contain q.js but should be filtered out
            // The original code filters lines between qStartingLine and qEndingLine
            const hasUnfilteredInternalFrames = stackLines.some(line => {
                return line.includes('q.js') &&
                       (line.includes('at Promise') ||
                        line.includes('at deferred.promise') ||
                        line.includes('at makeStackTraceLong'));
            });

            // With the original code, internal frames should be filtered out
            // With the mutated code (empty getFileNameAndLineNumber), they won't be
            expect(hasUnfilteredInternalFrames).toBe(false);
        });
    });
});