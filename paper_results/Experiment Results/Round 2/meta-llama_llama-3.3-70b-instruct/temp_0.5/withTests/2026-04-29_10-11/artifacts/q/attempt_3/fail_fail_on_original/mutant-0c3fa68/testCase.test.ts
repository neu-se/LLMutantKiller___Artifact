import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q progress function", () => {
    it("should throw an error when progress function is empty", () => {
        var deferred = Q.defer();

        expect(() => Q.progress(deferred.promise, function () {})).toThrowError();
    });
});