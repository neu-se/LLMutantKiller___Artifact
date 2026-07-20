import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Promise.prototype.all", () => {
    it("should call the callback with an array of values when all promises are resolved", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        return Q.all([promise1, promise2]).then(function (values: any[]) {
            expect(values).toEqual([1, 2]);
        });
    });
});