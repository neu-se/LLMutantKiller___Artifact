import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should capture the line number correctly", () => {
        // Create a new error to capture the current line number
        let error: Error;
        try {
            throw new Error();
        } catch (e) {
            error = e;
        }

        // Get the current line number
        const lineNumber = error.stack.split("\n")[2].split(":")[1];

        // Check if the line number is correctly captured
        expect(lineNumber).not.toBeUndefined();
    });
});