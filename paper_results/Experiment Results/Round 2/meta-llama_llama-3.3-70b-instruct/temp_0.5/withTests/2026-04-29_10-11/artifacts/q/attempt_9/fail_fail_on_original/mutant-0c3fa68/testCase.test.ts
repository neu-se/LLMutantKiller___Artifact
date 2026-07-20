import { Q } from "../../../../../q.js";

describe("Q progress function", () => {
    it("should throw an error when progress is called with an empty function", () => {
        var deferred = Q.defer();

        expect(() => Q.progress(deferred.promise, function () {})).toThrowError();
    });
});