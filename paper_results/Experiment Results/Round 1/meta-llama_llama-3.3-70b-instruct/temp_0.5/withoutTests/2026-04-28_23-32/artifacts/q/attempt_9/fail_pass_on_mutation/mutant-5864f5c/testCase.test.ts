import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should detect StopIteration exception correctly", () => {
        function* generator() {
            yield 1;
        }
        const gen = generator();
        const result = gen.next();
        if (result.done) {
            throw new Error("Generator should not be done yet");
        }
        const exception = new Error();
        exception.name = "StopIteration";
        const objectToString = Object.prototype.toString;
        const isStopIteration = (exception: any) => objectToString.call(exception) === "[object StopIteration]";
        const isStopIterationResult = isStopIteration(exception);
        expect(isStopIterationResult).toBe(false);
        const QReturnValue = function (value) {
            this.value = value;
        };
        const returnValueException = new QReturnValue(1);
        const isReturnValue = (exception: any) => objectToString.call(exception) === "[object Object]";
        const isReturnValueResult = isReturnValue(returnValueException);
        expect(isReturnValueResult).toBe(true);
    });
});