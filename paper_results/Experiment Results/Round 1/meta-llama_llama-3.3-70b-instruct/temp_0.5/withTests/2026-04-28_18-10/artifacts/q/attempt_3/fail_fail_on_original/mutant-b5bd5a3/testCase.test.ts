import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should have a valueOf method that returns the promise itself when it is pending", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.valueOf()).toBe(promise);
    });
});