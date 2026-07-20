import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should detect the mutation in isStopIteration function", () => {
        // Create a non-StopIteration exception
        var exception = {};

        // Check if the exception is not an instance of StopIteration
        expect(q.isStopIteration(exception)).toBe(false);
    });
});