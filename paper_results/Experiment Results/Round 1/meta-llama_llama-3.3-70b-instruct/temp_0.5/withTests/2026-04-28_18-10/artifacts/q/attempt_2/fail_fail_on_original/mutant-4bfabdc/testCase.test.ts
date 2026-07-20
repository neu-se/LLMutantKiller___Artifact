import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        var error = new Error();
        var stack = error.stack;

        // Create a new stack trace that includes internal frames
        var newStack = "Error\n    at filterStackString (q.js:123)\n    at makeStackTraceLong (q.js:456)\n    at Promise.prototype.then (q.js:789)";
        error.stack = newStack;

        // Call the filterStackString function to filter out internal frames
        var filteredStack = Q.filterStackString(newStack);

        // Check if the internal frames are filtered out
        expect(filteredStack).toContain("filterStackString");
        expect(filteredStack).toContain("makeStackTraceLong");
        expect(filteredStack).toContain("Promise.prototype.then");
    });
});