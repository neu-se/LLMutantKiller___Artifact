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
            const stackLines = e.stack.split('\n');
            expect(stackLines.length).toBeGreaterThan(15);
            expect(stackLines[stackLines.length - 1]).toContain("q.js");
        });
    });
});