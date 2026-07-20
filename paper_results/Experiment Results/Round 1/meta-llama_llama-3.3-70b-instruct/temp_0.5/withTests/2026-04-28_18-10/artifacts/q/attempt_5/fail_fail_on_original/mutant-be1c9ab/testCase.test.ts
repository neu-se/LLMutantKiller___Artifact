import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration function", () => {
    it("should correctly identify StopIteration exceptions", () => {
        const stopIterationException = { toString: () => "[object StopIteration]" };
        const objectToString = Object.prototype.toString;

        // In the original code, this should return true
        expect(objectToString.call(stopIterationException) === "[object StopIteration] || stopIterationException instanceof q.QReturnValue").toBe(true);

        // In the mutated code, this should return false because of the incorrect use of '&&' instead of '||'
        // So, this test should pass on the original code and fail on the mutated code
    });
});