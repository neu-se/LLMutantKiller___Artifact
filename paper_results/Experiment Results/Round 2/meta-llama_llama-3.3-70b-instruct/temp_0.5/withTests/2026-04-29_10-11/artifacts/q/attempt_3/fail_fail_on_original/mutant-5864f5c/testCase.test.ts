import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a StopIteration exception
        var exception = { toString: function() { return "[object StopIteration]"; } };

        // Check if object_toString(exception) === "[object StopIteration]" returns true
        expect(q.isStopIteration(exception)).toBe(true);
    });
});