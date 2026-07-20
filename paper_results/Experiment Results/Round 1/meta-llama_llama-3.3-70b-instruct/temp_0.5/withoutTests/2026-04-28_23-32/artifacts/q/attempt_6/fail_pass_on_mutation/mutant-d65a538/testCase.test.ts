import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle fileNameAndLineNumber correctly", () => {
        // Call the Q function to test the behavior
        const Q = q.default || q;

        const originalError = Error;
        Error = function(message: string) {
            return new originalError(message);
        };

        expect(() => {
            Q();
        }).not.toThrowError();

        Error = originalError;
    });
});