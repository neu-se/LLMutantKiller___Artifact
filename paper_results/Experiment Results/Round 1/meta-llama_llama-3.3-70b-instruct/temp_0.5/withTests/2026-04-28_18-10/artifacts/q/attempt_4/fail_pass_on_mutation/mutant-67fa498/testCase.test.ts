import * as Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("q.js", () => {
    it("should test the behavior of the mutated file", () => {
        var deferred = Q.defer();
        var promise = deferred.promise;

        var task = function () {
            deferred.resolve("test");
        };

        Q.nextTick(task);

        // This test case will pass on the original code and fail on the mutated code
        // because the mutated code has a while (false) loop which will not execute the task in the laterQueue.
        return promise.then(function (result: any) {
            expect(result).toBe("test");
        });
    });
});