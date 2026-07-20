import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.isPending", function () {
    it("should return false for a pending promise", function () {
        var deferred = Q.defer();
        // The mutated code should incorrectly return false for a pending promise
        expect(Q.isPending(deferred.promise)).toBe(false);
    });
});