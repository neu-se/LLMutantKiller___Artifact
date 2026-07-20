import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString function", () => {
    it("should filter out lines from the stack trace that are internal to Q", () => {
        var error = new Error();
        if (error.stack) {
            var stackLines = error.stack.split("\n");
            var filteredLines = stackLines.filter(function(stackLine) {
                return !Q.isInternalFrame(stackLine);
            });
            expect(filteredLines.length).toBeLessThan(stackLines.length);
        } else {
            expect(true).toBe(false);
        }
    });
});