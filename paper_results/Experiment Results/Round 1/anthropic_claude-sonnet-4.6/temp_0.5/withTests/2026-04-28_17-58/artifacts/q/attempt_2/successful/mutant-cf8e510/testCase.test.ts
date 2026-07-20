import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("makeStackTraceLong mutation detection", () => {
    it("should not throw when rejecting with a string reason and long stack support enabled", async () => {
        Q.longStackSupport = true;
        try {
            const deferred = Q.defer();
            // Reject with a string (non-object) - typeof "string reason" !== "object"
            // Original: promise.stack is truthy but typeof error === "object" is false -> skip block
            // Mutated: (hasStacks && promise.stack) is true -> enter block -> tries to access/modify string's .stack
            deferred.reject("string reason");

            let capturedReason: any = null;
            await deferred.promise.then(null, (reason: any) => {
                capturedReason = reason;
            });

            // The rejection reason should be the original string, unmodified
            expect(capturedReason).toBe("string reason");
        } finally {
            Q.longStackSupport = false;
        }
    });
});