import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.defer", () => {
    it("should resolve with the correct value when multiple arguments are passed to the node resolver", () => {
        const deferred = Q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1, 2, 3);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });
});