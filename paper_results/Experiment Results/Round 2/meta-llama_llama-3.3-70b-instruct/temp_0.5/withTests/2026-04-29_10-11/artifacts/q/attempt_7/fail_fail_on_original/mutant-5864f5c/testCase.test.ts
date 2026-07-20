import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create an exception
        var exception = new Error();

        // Check if the exception is an instance of Error
        expect(exception instanceof Error).toBe(true);

        // Check if the mutation is detected
        try {
            throw exception;
        } catch (e) {
            expect(q.isStopIteration(e)).toBe(false);
        }
    });
});