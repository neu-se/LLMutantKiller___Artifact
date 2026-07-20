import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should include stack trace information when longStackSupport is enabled", () => {
        Q.longStackSupport = true;
        const deferred = Q.defer();
        const promise = deferred.promise;
        const error = new Error("Test error");
        promise.then(() => { throw error; });
        deferred.resolve();
        return promise.catch((e: any) => {
            expect(e.stack.split('\n').length).toBeGreaterThan(10);
        });
    });
});