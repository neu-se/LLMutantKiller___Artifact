import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q Promise", () => {
    it("should create a promise with inspect function that returns the correct state after resolving", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        deferred.resolve("test");
        expect(promise.inspect().value).toBe("test");
    });
});