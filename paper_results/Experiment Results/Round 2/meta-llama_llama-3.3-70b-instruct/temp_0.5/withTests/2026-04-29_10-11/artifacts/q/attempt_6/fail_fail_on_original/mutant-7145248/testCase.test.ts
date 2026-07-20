import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should resolve with the first argument when arguments.length > 2", () => {
        const deferred = Q.defer();
        const args = [null, 1, 2, 3];
        deferred.makeNodeResolver()(...args);
        return deferred.promise.then((value) => {
            expect(value).toEqual(1);
        });
    });
});