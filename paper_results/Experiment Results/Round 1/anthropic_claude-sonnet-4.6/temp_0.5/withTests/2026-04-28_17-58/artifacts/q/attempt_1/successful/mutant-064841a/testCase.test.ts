import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack support - deferred promise stack capture", () => {
    it("should capture a stack trace on the deferred promise when longStackSupport is enabled", () => {
        const originalLongStackSupport = Q.longStackSupport;
        Q.longStackSupport = true;

        try {
            const deferred = Q.defer();
            const promise = deferred.promise;

            // In the original code, when longStackSupport is true and hasStacks is true,
            // the deferred promise should have a `stack` property set to a non-empty string
            // and a `stackCounter` property set to a number.
            // The mutated code has an empty if block and never sets these properties.
            expect(typeof promise.stack).toBe("string");
            expect(promise.stack.length).toBeGreaterThan(0);
            expect(typeof promise.stackCounter).toBe("number");
        } finally {
            Q.longStackSupport = originalLongStackSupport;
        }
    });
});