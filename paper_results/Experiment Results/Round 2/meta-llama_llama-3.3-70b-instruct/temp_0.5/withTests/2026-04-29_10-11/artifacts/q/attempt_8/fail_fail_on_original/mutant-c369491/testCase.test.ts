import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the then method with the correct value when op is 'when'", () => {
        var deferred = Q.defer();
        var promise = Q.when(deferred.promise, (value: string) => {
            expect(value).toBe("test");
        });

        deferred.resolve("test");

        return promise;
    });

    it("should not call the then method with the correct value when op is not 'when'", () => {
        var deferred = Q.defer();
        var promise = Q.when(deferred.promise, (value: string) => {
            expect(true).toBe(false);
        }, undefined, (value: string) => {
            expect(value).toBe("test");
        });

        deferred.notify("test");
        deferred.resolve("test");

        return promise;
    });
});