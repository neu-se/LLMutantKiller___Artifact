import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q.nextTick", () => {
    it("should work correctly", () => {
        var deferred = Q.defer();
        Q.nextTick(function () {
            deferred.resolve();
        });
        return deferred.promise;
    });
});