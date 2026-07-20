import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a promise when the input is a deferred promise that is resolved later with a promise that is also resolved", () => {
        const deferred = Q.defer();
        const innerDeferred = Q.defer();
        const promise = deferred.promise;
        return promise.then((value: any) => {
            expect(value).toBe("test");
        });
        deferred.resolve(innerDeferred.promise);
        innerDeferred.resolve("test");
    });
});