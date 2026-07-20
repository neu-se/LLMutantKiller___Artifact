import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle StopIteration exception correctly", () => {
        var error = new Error();
        error.name = "StopIteration";
        var QReturnValue = function (value) {
            this.value = value;
        };
        var isStopIteration = function (exception) {
            return exception instanceof QReturnValue;
        };
        expect(isStopIteration(error)).toBe(false);
        expect(isStopIteration(new QReturnValue())).toBe(true);
    });
});