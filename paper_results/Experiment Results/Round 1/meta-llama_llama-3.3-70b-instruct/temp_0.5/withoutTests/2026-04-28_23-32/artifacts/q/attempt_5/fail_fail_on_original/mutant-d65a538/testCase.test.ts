import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle fileNameAndLineNumber correctly", () => {
        // Call the Q function to test the behavior
        const Q = q.default || q;

        const originalError = Error;
        Error = function() {
            throw new Error("Test error");
        };

        expect(() => {
            Q();
        }).toThrowError("Test error");

        Error = originalError;
    });
});