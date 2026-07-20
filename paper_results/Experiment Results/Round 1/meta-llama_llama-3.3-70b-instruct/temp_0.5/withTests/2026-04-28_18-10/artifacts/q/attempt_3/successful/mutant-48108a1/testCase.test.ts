import * as Q from "../../../../../../../../../../../subject_repositories/q/q";

describe("q.js", () => {
    it("should return a promise with a state of 'pending' when inspect is called on a pending promise", () => {
        const deferred = Q.defer();
        const promise = deferred.promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
    });
});