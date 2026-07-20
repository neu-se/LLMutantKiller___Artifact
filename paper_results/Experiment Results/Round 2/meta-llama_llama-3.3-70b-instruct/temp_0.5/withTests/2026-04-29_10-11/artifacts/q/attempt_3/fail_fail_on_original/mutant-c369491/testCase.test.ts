import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise", () => {
    it("should call the then method with the correct value", () => {
        var deferred = Q.defer();
        var promise = deferred.promise.then(function (value) {
            expect(value).toBe("test");
        });

        deferred.resolve("test");

        return promise;
    });
});