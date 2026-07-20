import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should correctly handle the valueOf method for pending promises", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;

        deferred.reject(new Error());

        expect(() => promise.valueOf()).toThrowError();
    });
});