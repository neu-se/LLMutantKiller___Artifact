import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("q", () => {
    it("should test the behavior of the mutated file", () => {
        const deferred = Q.defer();
        const error = new Error("Test error");
        deferred.reject(error);
        const promise = Q.when(deferred.promise, null, (reason) => {
            throw reason;
        });
        expect(() => Q.when(promise, () => {}, () => {})).toThrowError(error);
    });
});