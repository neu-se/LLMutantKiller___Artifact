import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should inspect a promise correctly", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;
        expect(promise.inspect()).toEqual({ state: "pending" });
        deferred.resolve();
        expect(promise.inspect()).toEqual({ state: "fulfilled", value: undefined });
    });
});