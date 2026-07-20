import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("defer", () => {
    it("should resolve with multiple arguments when arguments.length > 2", () => {
        const deferred = Q.defer();
        const args = [1, 2, 3];
        deferred.makeNodeResolver()(null, ...args);
        return deferred.promise.then((value) => {
            expect(value).toEqual([1, 2, 3]);
        });
    });
});