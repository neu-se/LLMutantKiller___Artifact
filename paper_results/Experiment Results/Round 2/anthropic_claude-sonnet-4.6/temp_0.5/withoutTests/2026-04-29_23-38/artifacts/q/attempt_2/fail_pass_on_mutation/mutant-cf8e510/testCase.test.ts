import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
    it("should complete rejection chain without error when longStackSupport is false", async () => {
        // With longStackSupport false, promise.stack is not set
        // Original: hasStacks && undefined && ... => false (safe, no-op)
        // Mutated:  hasStacks && undefined || typeof error === "object" => true
        //           then tries to access promise.stack.split() => TypeError!
        Q.longStackSupport = false;

        const error = new Error("test");
        let resolvedValue: string | null = null;
        let threwError = false;

        try {
            await new Promise<void>((resolve, reject) => {
                Q.reject(error)
                    .then(null, function(e: Error) {
                        resolvedValue = e.message;
                        resolve();
                    })
                    .done();
            });
        } catch (e) {
            threwError = true;
        }

        expect(threwError).toBe(false);
        expect(resolvedValue).toBe("test");
    });
});