import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q long stack support", () => {
    it("should enable long stack traces when Q.longStackSupport is true", () => {
        // Enable long stack support
        Q.longStackSupport = true;

        // Create a chain of promises to generate a stack trace
        const promise = Q.resolve().then(() => {
            throw new Error("Test error");
        });

        return promise.then(
            () => {
                throw new Error("Promise should have been rejected");
            },
            (error: Error) => {
                // Check that the error has a stack trace
                expect(error.stack).toBeDefined();

                // Check that the stack trace contains the "From previous event" separator
                // which indicates long stack traces are enabled
                expect(error.stack).toContain("From previous event");

                // Disable long stack support for cleanup
                Q.longStackSupport = false;
            }
        );
    });
});