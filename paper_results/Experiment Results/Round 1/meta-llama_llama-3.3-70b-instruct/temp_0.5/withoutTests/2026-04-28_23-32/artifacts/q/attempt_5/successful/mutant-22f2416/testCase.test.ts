import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.defer", () => {
    it("should resolve with the correct value when two arguments are passed to the node resolver", () => {
        const deferred = q.defer();
        const resolver = deferred.makeNodeResolver();
        resolver(null, 1);
        return deferred.promise.then((value) => {
            expect(value).toEqual(1);
        });
    });
});