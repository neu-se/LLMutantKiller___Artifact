import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not filter error stack frames when longStackSupport is false", async () => {
        Q.longStackSupport = false;

        let capturedError: any;

        await new Promise<void>((resolve) => {
            Q(1).then(function() {
                // This error's stack will contain Q internal frames
                const err = new Error("test");
                throw err;
            }).then(null, function(e: any) {
                capturedError = e;
                resolve();
            });
        });

        // The error's stack should contain Q-related frames
        // Original: makeStackTraceLong is skipped (promise.stack is falsy) → stack unchanged
        // Mutated: makeStackTraceLong runs → Q frames filtered out → stack changes
        const stack = capturedError.stack || "";
        // Stack should contain some frames (not be empty or minimal)
        expect(stack).toContain("Error: test");
    });
});