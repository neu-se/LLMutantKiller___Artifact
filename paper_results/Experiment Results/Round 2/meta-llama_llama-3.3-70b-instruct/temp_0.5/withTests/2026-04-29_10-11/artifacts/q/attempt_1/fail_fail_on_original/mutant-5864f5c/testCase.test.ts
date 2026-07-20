import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var exception = new QReturnValue();

        // Check if object_toString(exception) === "[object StopIteration]" returns true
        expect(Q.isStopIteration(exception)).toBe(true);

        // Check if object_toString(exception) !== "[object StopIteration]" returns false
        var originalIsStopIteration = Q.isStopIteration;
        Q.isStopIteration = function (exception) {
            return object_toString(exception) !== "[object StopIteration]";
        };
        expect(Q.isStopIteration(exception)).toBe(false);
        Q.isStopIteration = originalIsStopIteration;
    });
});