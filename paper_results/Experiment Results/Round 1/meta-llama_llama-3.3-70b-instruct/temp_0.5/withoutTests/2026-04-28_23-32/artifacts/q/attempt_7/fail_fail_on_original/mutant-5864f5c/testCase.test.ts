import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        const QReturnValue = function (value) {
            this.value = value;
        };
        const exception = new QReturnValue();
        const objectToString = Object.prototype.toString;
        const isStopIteration = (exception: any) => objectToString.call(exception) === "[object StopIteration]";
        const isStopIterationResult = isStopIteration(exception);
        expect(isStopIterationResult).toBe(true);
    });
});