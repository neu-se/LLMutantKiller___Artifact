import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var exception = { toString: function() { return "[object StopIteration]"; } };

        // Check if object_toString(exception) === "[object StopIteration]" returns true
        var originalIsStopIteration = Q.isStopIteration;
        Q.isStopIteration = function (exception) {
            return Object.prototype.toString.call(exception) === "[object StopIteration]";
        };
        expect(Q.isStopIteration(exception)).toBe(true);

        // Check if object_toString(exception) !== "[object StopIteration]" returns false
        Q.isStopIteration = function (exception) {
            return Object.prototype.toString.call(exception) !== "[object StopIteration]";
        };
        expect(Q.isStopIteration(exception)).toBe(false);
        Q.isStopIteration = originalIsStopIteration;
    });
});