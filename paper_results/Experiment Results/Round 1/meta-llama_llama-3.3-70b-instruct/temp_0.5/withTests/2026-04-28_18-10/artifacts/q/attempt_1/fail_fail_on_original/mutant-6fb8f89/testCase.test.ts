import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.spread", () => {
    it("should call the callback with the spread values", () => {
        var deferred = Q.defer();
        var promise = Q.spread(deferred.promise, function (a, b) {
            expect(a).toBe(1);
            expect(b).toBe(2);
        });
        deferred.resolve([1, 2]);
        return promise;
    });
});