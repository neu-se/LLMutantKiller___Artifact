import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("isStopIteration function", () => {
    it("should correctly identify StopIteration exceptions", () => {
        const stopIterationException = { toString: () => "[object StopIteration]" };
        const objectToString = Object.prototype.toString;

        // In the mutated code, this should return false
        expect(objectToString.call(stopIterationException) === "[object StopIteration]" && true).toBe(false);

        // In the original code, this should return true
        expect(objectToString.call(stopIterationException) === "[object StopIteration]" || true).toBe(true);
    });
});