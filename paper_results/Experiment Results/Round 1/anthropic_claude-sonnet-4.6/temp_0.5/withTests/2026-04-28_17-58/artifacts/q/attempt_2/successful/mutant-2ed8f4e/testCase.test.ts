import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("filterStackString", () => {
    it("should set error.stack to a non-undefined string when long stack support processes a rejection", () => {
        Q.longStackSupport = true;

        const deferred = Q.defer();
        const error = new Error("test mutation detection");

        // Create a promise chain so makeStackTraceLong gets invoked
        const result = deferred.promise
            .then(function step1() {
                return Q.reject(error);
            })
            .then(null, function catchError(err: any) {
                return err;
            });

        deferred.resolve();

        return result.then(function (err: any) {
            Q.longStackSupport = false;
            // In the original code, filterStackString returns a filtered string
            // so error.stack is set to a string value.
            // In the mutated code, filterStackString returns undefined,
            // so error.stack is set to undefined.
            expect(err.stack).toBeDefined();
            expect(typeof err.stack).toBe("string");
            expect(err.stack.length).toBeGreaterThan(0);
        });
    });
});