import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not filter empty lines from error stack when longStackSupport is false", async () => {
        Q.longStackSupport = false;

        const error = new Error("test");
        // Inject an empty line into the stack
        error.stack = "Error: test\n    at foo (test.js:1:1)\n\n    at bar (test.js:2:1)";
        const originalStack = error.stack;

        await new Promise<void>((resolve) => {
            Q.reject(error).then(null, function(_e: any) {
                resolve();
            });
        });

        // Original: body skipped → stack unchanged (has empty line)
        // Mutated: body runs → empty line filtered out → stack changed
        expect(error.stack).toBe(originalStack);
    });
});