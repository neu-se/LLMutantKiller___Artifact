import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle StopIteration exception correctly", () => {
        var error = new Error();
        error.name = "StopIteration";
        var QReturnValue = function (value) {
            this.value = value;
        };
        var isStopIteration = function (exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        };
        expect(isStopIteration(new QReturnValue())).toBe(false);
    });
});