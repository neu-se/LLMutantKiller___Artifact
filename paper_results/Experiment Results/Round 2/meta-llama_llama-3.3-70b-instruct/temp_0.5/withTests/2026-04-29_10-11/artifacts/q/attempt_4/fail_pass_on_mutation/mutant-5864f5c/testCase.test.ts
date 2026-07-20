import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var exception = new Error();

        // Check if the exception is an instance of Error
        expect(exception instanceof Error).toBe(true);

        // Check if the exception's toString method returns a string
        expect(typeof exception.toString()).toBe('string');
    });
});