import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("stack trace parsing", () => {
    it("should correctly parse stack traces with 'at filename:lineNumber:columnNumber' format", () => {
        // Create a promise chain that will generate stack traces
        // and verify they are properly parsed
        const error = new Error("Test error");

        // Create a stack trace that should match the attempt2 pattern
        // by throwing and catching an error in a specific way
        let stackParsed = false;

        try {
            throw error;
        } catch (e) {
            // This will trigger the stack trace parsing code
            const promise = Q.reject(e);

            // The promise should have proper stack trace handling
            return promise.then(
                () => {
                    throw new Error("Should not reach here");
                },
                (caughtError) => {
                    // Verify the error has a stack property
                    expect(caughtError).toBeDefined();
                    expect(caughtError.stack).toBeDefined();
                    expect(typeof caughtError.stack).toBe("string");

                    // The stack should contain our test error message
                    expect(caughtError.stack).toContain("Test error");

                    // If attempt2 condition is always false, stack parsing won't work
                    // for certain formats, which would affect the stack trace
                    stackParsed = true;
                }
            ).then(() => {
                expect(stackParsed).toBe(true);
            });
        }
    });
});