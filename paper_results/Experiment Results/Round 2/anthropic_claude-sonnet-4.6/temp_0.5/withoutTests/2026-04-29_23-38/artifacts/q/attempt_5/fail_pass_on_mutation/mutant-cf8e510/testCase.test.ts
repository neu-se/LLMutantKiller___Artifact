import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong", () => {
    it("should not set stack on error object that has no stack when longStackSupport is true", async () => {
        Q.longStackSupport = true;

        const error = { message: "plain object, no stack" } as any;
        expect(error.stack).toBeUndefined();

        await new Promise<void>((resolve) => {
            Q.reject(error).then(null, function(_e: any) {
                resolve();
            });
        });

        // Original: error.stack check in condition fails → body skipped → stack stays undefined
        // Mutated: condition short-circuits (promise.stack is truthy) → body runs → error.stack gets modified
        expect(error.stack).toBeUndefined();
    });
});