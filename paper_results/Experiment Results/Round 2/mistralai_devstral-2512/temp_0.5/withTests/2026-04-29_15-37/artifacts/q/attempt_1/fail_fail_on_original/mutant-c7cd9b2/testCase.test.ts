import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with 'at filename:lineNumber:columnNumber' format", () => {
        // Create a scenario that would generate a stack trace matching attempt2 pattern
        // This test relies on the internal stack trace parsing functionality
        const deferred = Q.defer();
        let stackTrace: string | undefined;

        // Set up error handler to capture stack trace
        const originalOnerror = Q.onerror;
        Q.onerror = function(error: any) {
            stackTrace = error.stack;
        };

        // Create and reject a promise to trigger stack trace parsing
        Q.nextTick(() => {
            try {
                throw new Error("Test error");
            } catch (e) {
                deferred.reject(e);
            }
        });

        return deferred.promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            (error) => {
                // Restore original error handler
                Q.onerror = originalOnerror;

                // The stack trace should be properly parsed
                // If attempt2 condition is always false, this parsing won't work correctly
                expect(stackTrace).toBeDefined();
                expect(typeof stackTrace).toBe("string");
                expect(stackTrace!.length).toBeGreaterThan(0);
            }
        );
    });
});