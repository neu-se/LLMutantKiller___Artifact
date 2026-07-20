import { Q } from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer", () => {
    it("should resolve with the first argument when more than two arguments are passed to the node resolver", () => {
        const deferred = Q.defer();
        const callback = deferred.makeNodeResolver();
        callback(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(value).toBe(1);
        });
    });

    it("should resolve with the first argument when exactly two arguments are passed to the node resolver", () => {
        const deferred = Q.defer();
        const callback = deferred.makeNodeResolver();
        callback(null, 1);
        return deferred.promise.then((value) => {
            expect(value).toBe(1);
        });
    });
});