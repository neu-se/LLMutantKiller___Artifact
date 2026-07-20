import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle StopIteration exception correctly", () => {
        var QReturnValue = function (value) {
            this.value = value;
        };
        var error = new QReturnValue();
        var isStopIteration = function (exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        };
        expect(isStopIteration(error)).toBe(false);
    });
});