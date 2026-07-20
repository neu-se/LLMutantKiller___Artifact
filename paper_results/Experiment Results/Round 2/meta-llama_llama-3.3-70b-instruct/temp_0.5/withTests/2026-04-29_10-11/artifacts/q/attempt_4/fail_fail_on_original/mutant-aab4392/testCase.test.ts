import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q.all", () => {
    it("should resolve when all promises are resolved", () => {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        var promise3 = Q.resolve(3);

        return Q.all([promise1, promise2, promise3]).then(function(values) {
            expect(values).toEqual([1, 2, 3]);
        });
    });
});