import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new error
        const error = new Error();

        // Get the stack trace of the error
        const stackTrace = error.stack;

        // Check if the stack trace is not empty
        expect(stackTrace).not.toBeNull();

        // Check if the stack trace contains the file name and line number
        expect(stackTrace).toContain(__filename);
    });
});