import { Q } from "../../../../../../../../../../../subject_repositories/q/q";

describe("Q.all function", () => {
    it("should resolve when all promises are resolved", () => {
        var promise1 = Q.resolve(1);
        var promise2 = Q.resolve(2);
        var promise3 = Q.resolve(3);
        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(values).toEqual([1, 2, 3]);
        });
    });

    it("should reject when any promise is rejected", () => {
        var promise1 = Q.resolve(1);
        var promise2 = Q.reject(2);
        var promise3 = Q.resolve(3);
        return Q.all([promise1, promise2, promise3]).then((values) => {
            expect(true).toBe(false);
        }).catch((error) => {
            expect(error).toBe(2);
        });
    });
});