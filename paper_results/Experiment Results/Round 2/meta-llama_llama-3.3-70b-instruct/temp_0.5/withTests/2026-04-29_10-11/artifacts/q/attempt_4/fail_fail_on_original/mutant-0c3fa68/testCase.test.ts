import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q progress function", () => {
    it("should not throw an error when progress function is defined", () => {
        var deferred = Q.defer();

        expect(() => Q.progress(deferred.promise, function (progress) {
            // progress callback
        })).not.toThrowError();
    });
});