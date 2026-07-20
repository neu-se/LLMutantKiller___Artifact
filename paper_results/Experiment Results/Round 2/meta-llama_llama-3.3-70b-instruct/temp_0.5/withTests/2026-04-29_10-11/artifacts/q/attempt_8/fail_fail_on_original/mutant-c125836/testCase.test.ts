import Q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe("Q.all function with mutation", () => {
    it("should resolve when all promises are resolved and check if the mutation is present", () => {
        var promise1 = Q(1);
        var promise2 = Q(2);
        var promise3 = Q(3);
        var allPromise = Q.all([promise1, promise2, promise3]);
        if (allPromise instanceof Q) {
            return allPromise.then(function (values) {
                expect(values).toEqual([1, 2, 3]);
            });
        } else {
            return allPromise.then(function (values) {
                expect(true).toBe(false);
            });
        }
    });
});