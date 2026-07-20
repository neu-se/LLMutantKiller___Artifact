import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should correctly filter internal frames from stack traces", () => {
        // Create a new promise that will be rejected
        const promise = Q.reject(new Error("Test error"));

        // Create a stack trace
        let stackTrace: string | undefined;
        try {
            // Throw an error to get the current stack trace
            throw new Error("Test error");
        } catch (error) {
            stackTrace = error.stack;
        }

        // Make sure the stack trace is not null or undefined
        if (stackTrace === null || stackTrace === undefined) {
            throw new Error("Failed to get stack trace");
        }

        // Filter the stack trace to remove internal frames
        const filteredStackTrace = Q.filterStackString(stackTrace);

        // Check if the filtered stack trace still contains the error message
        expect(filteredStackTrace).toContain("Test error");

        // Check if the filtered stack trace does not contain any internal frames
        expect(filteredStackTrace).not.toContain("isInternalFrame");
    });
});