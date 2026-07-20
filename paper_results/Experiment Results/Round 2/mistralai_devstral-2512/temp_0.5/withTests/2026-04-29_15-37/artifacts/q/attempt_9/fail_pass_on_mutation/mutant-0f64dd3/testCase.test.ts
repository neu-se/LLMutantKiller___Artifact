import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("error handling with stack traces", () => {
    it("should properly handle errors with stack traces", () => {
        // Enable long stack traces to trigger the captureLine function
        Q.longStackSupport = true;

        // Create a promise chain that will generate stack traces
        const promise = Q.reject(new Error("Test error"))
            .then(() => {
                // This should never be called
                return "unreachable";
            })
            .catch((error: Error) => {
                // Verify the error has a stack trace
                expect(error.stack).toBeDefined();

                // The mutation affects how stack traces are captured
                // when file/line information is missing
                // This should work correctly in the original code
                return error;
            });

        return promise.then((error: Error) => {
            // Verify we got the error back
            expect(error.message).toBe("Test error");
            return true;
        });
    });
});