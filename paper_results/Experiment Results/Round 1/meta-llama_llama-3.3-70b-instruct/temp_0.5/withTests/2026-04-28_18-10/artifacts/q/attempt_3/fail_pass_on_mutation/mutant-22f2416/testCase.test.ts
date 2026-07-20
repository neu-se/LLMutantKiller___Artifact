import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer", () => {
    it("should resolve with an array of arguments when more than two arguments are passed to the node resolver in the mutated code", () => {
        const deferred = Q.defer();
        const callback = deferred.makeNodeResolver();
        callback(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });
});