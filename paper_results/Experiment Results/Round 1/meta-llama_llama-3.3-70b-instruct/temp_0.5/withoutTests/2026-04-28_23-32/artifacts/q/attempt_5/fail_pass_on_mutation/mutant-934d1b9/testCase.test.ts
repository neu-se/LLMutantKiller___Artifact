import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when the input is a deferred promise that is resolved later", (done) => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        promise.then((value: any) => {
            expect(value).toBe("test");
            done();
        });
        deferred.resolve("test");
    });
});