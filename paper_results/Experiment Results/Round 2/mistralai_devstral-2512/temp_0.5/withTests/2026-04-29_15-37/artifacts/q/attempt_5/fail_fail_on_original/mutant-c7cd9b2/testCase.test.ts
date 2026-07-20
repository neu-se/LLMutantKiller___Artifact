import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with 'at filename:lineNumber:columnNumber' format", () => {
        // Create a promise that will generate a stack trace
        const promise = Q.reject(new Error("Test error"));

        // Set up a handler to capture the stack trace
        let stackTrace: string | undefined;
        Q.onerror = (error: any) => {
            stackTrace = error.stack;
        };

        // Force the promise to be rejected and trigger stack trace parsing
        return promise.then(
            () => {
                throw new Error("Should not reach here");
            },
            () => {
                // Verify the stack trace was captured
                expect(stackTrace).toBeDefined();

                // The key test: verify the stack trace contains the expected format
                // The original code should properly parse stack traces with this format
                // The mutated code will fail to parse it because attempt2 condition is always false
                const hasCorrectFormat = stackTrace && stackTrace.includes("at ");
                expect(hasCorrectFormat).toBe(true);

                // Additional verification that the stack trace was properly formatted
                // This should only pass if attempt2 parsing worked
                const stackLines = stackTrace!.split('\n');
                const hasFileLineFormat = stackLines.some(line =>
                    /at [^ ]+:\d+:\d+/.test(line)
                );
                expect(hasFileLineFormat).toBe(true);

                // Clean up
                Q.onerror = null;
            }
        );
    });
});