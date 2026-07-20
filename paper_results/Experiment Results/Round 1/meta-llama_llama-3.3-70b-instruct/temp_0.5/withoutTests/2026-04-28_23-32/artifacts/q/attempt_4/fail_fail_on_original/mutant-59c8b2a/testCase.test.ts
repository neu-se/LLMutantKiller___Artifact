import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q promise", () => {
    it("should throw an error when valueOf is called on a pending promise", () => {
        const deferred = q.defer();
        const promise = deferred.promise;
        expect(() => promise.valueOf()).toThrow();
    });
});