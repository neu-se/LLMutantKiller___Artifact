import { Q } from "../../q";

describe("defer", () => {
    it("should resolve with an array of arguments when arguments.length > 2", () => {
        const deferred = Q.defer();
        const args = [null, 1, 2, 3];
        deferred.makeNodeResolver()(...args);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });
});