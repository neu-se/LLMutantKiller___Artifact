import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should resolve with all arguments when the number of arguments is greater than 2", () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });

    it("should not resolve with all arguments when the number of arguments is less than 2", () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1);
        return deferred.promise.then((value) => {
            expect(value).not.toEqual([1]);
        });
    });
});