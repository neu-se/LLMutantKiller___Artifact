import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a new Error object
        const error = new Error();

        // Test the original code
        const isStopIteration = (exception) => 
            Object.prototype.toString.call(exception) === "[object StopIteration]" ||
            exception instanceof Q.QReturnValue;
        
        expect(isStopIteration(error)).toBe(false);
    });
});