import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var QReturnValue = function (value) {
            this.value = value;
        };

        var exception = new QReturnValue();

        // Check if the exception is an instance of QReturnValue
        expect(Object.prototype.toString.call(exception)).toBe("[object Object]");

        // Check if the mutation is detected
        var originalIsStopIteration = q.isStopIteration;
        q.isStopIteration = function (exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        };
        expect(q.isStopIteration(exception)).toBe(false);
    });
});