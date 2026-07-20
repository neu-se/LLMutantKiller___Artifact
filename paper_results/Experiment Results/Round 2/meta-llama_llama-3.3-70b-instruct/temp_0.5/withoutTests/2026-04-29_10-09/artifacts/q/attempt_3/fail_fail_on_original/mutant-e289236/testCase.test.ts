import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q promise library", () => {
    it("should resolve a promise with a value when the deferred object is resolved", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        const value = "test value";
        deferred.resolve(value);
        expect(promise.inspect().state).toBe("fulfilled");
        expect(promise.inspect().value).toBe(value);
    });
});