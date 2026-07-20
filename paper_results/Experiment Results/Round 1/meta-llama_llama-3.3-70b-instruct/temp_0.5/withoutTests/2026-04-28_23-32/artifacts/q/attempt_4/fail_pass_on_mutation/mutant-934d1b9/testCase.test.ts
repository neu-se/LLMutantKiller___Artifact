import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve a deferred promise", () => {
        const deferred = Q.defer();
        deferred.resolve("test");
        return deferred.promise.then((value: any) => {
            expect(value).toBe("test");
        });
    });
});