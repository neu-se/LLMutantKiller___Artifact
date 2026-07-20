import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces with missing line information", () => {
    it("should handle promises with long stack traces correctly", () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        // Create a chain of promises that will generate stack traces
        const promise = Q.reject(new Error("Test error"))
            .then(() => {
                // This should never be called
                return "unreachable";
            })
            .catch((error) => {
                // Verify the error has a stack trace
                expect(error.stack).toBeDefined();

                // The mutation affects how stack traces are captured
                // when file/line information is missing
                // This should still work correctly in the original code
                return error;
            });

        return promise.then((error) => {
            // Verify we got the error back
            expect(error.message).toBe("Test error");
            return true;
        });
    });
});