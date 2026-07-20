import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var QReturnValue = function (value) {
            this.value = value;
        };

        var exception = new QReturnValue();

        // Check if the exception is an instance of QReturnValue
        expect(q.isStopIteration(exception)).toBe(true);
    });
});