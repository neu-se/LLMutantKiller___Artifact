import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Stack trace parsing with named function format", () => {
    it("should correctly parse stack lines with named function format", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a promise that will generate a specific stack trace format
        const deferred = Q.defer();

        // Create an error with a stack trace that matches the first regex pattern
        const error = new Error("Test error");
        error.stack = [
            "Error: Test error",
            "    at namedFunction (test.js:42:10)",
            "    at otherFunction (test.js:50:5)"
        ].join("\n");

        // Use the error in a promise rejection
        deferred.reject(error);

        return deferred.promise.then(
            () => {
                throw new Error("Should not resolve");
            },
            (caughtError) => {
                // The stack should still contain our named function format
                expect(caughtError.stack).toContain("namedFunction (test.js:42:10)");

                // The mutation would prevent parsing of this format
                // which would affect how Q processes the stack trace
                // In the mutated version, this line format wouldn't be recognized
                // causing different behavior in stack trace filtering

                // Verify the error was processed correctly
                expect(caughtError.message).toBe("Test error");

                // Check that the stack trace was properly filtered
                // The original code should filter internal Q frames
                // The mutated code might not filter them correctly
                const hasQFrames = caughtError.stack?.includes("q.js") || false;
                expect(hasQFrames).toBe(false);

                return true;
            }
        );
    });
});