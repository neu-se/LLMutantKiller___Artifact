import { Q } from "../../../q";

describe("defer", () => {
    it("should resolve with an error when arguments.length <= 2", () => {
        const deferred = Q.defer();
        const args = [null, 1];
        deferred.makeNodeResolver()(...args);
        return deferred.promise.then((value) => {
            expect(value).toBe(1);
        });
    });
});