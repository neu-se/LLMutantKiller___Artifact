import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q progress function", () => {
    it("should not throw an error when progress is called with a function", () => {
        var deferred = Q.defer();

        expect(() => Q.progress(deferred.promise, () => {})).not.toThrowError();
    });
});