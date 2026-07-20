import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("long stack traces", () => {
    it("should include stack traces when long stack support is enabled", async () => {
        // Enable long stack traces
        Q.longStackSupport = true;

        const error = new Error("Test error");
        const deferred = Q.defer();

        // Create a chain of promises to generate a stack trace
        Q().then(() => {
            return Q().then(() => {
                deferred.reject(error);
            });
        });

        try {
            await deferred.promise;
            throw new Error("Promise should have rejected");
        } catch (err: any) {
            // Check that the error has a stack trace with the expected content
            expect(err.stack).toBeDefined();
            expect(err.stack).toMatch(/Test error/);
            // Check that the stack trace includes the promise chain
            expect(err.stack).toMatch(/at.*deferred\.reject/);
        }
    });
});