import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should capture the line number correctly", () => {
        // Create a new promise
        const promise = Q();

        // Get the current line number
        const lineNumber = promise.inspect().stackCounter;

        // Check if the line number is greater than 0
        expect(lineNumber).toBeGreaterThan(0);
    });
});