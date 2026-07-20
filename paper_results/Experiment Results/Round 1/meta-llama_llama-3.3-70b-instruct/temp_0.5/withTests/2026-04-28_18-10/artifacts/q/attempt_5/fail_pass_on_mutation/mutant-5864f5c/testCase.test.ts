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
        expect(isStopIteration(new QReturnValue())).toBe(true);
        expect(isStopIteration(error)).toBe(false);
        var StopIteration = function () {};
        StopIteration.prototype = Object.create(Error.prototype);
        var stopIterationError = new StopIteration();
        expect(stopIterationError instanceof Error).toBe(true);
        expect(isStopIteration(stopIterationError)).toBe(false);
    });
});