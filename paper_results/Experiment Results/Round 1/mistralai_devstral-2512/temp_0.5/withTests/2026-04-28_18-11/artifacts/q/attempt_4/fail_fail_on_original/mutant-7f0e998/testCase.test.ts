const Q = require("../../../../../../../../../../../subject_repositories/q/q.js");

describe("filterStackString behavior", () => {
    it("should correctly filter internal frames from stack traces", async () => {
        // Enable long stack traces to trigger the filterStackString function
        Q.longStackSupport = true;

        // Create a promise chain that will generate internal stack frames
        const deferred = Q.defer();
        const promise = deferred.promise.then(() => {
            throw new Error("Test error");
        });

        try {
            await promise;
            deferred.reject(new Error("Should not reach here"));
        } catch (e: any) {
            // The stack should not contain Q internal frames in original code
            // but will contain them in mutated code
            const hasInternalFrames = e.stack.includes("q.js");
            expect(hasInternalFrames).toBe(false);
        } finally {
            Q.longStackSupport = false;
        }
    });
});