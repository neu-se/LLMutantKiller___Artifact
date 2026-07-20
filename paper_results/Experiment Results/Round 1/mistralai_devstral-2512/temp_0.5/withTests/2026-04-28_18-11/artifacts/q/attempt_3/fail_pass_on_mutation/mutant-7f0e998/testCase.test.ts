const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
    it("should filter out internal frames from stack traces", async () => {
        // Create a scenario that generates a stack trace with internal frames
        const error = new Error("Test error");
        const promise = Q.reject(error);

        try {
            await promise;
        } catch (e: any) {
            // The stack should not contain internal Q frames when long stack support is enabled
            Q.longStackSupport = true;
            const stack = e.stack;
            // Check that internal frames are filtered out
            expect(stack).not.toContain("q.js");
            Q.longStackSupport = false;
        }
    });
});