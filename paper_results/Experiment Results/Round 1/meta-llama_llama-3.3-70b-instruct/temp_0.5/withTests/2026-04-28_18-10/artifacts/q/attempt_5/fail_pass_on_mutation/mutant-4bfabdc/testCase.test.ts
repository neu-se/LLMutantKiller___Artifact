import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q", () => {
    it("should filter out internal frames from stack traces", () => {
        var error = new Error();
        var stack = error.stack;

        // Create a new stack trace that includes internal frames
        var newStack = "Error\n    at filterStackString (q.js:123)\n    at makeStackTraceLong (q.js:456)\n    at Promise.prototype.then (q.js:789)";
        error.stack = newStack;

        // Call the function that indirectly uses filterStackString
        var promise = q.reject(error);
        promise.then(null, function (err: any) {
            // Check if the internal frames are filtered out
            if (err.stack.includes("filterStackString") || err.stack.includes("makeStackTraceLong") || err.stack.includes("Promise.prototype.then")) {
                throw new Error("Internal frames not filtered out");
            }
        });
    });
});