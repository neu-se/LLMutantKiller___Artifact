import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should test the behavior of array_reduce with the mutated code", () => {
        var array = [1, 2, 3];
        var result = Q(array_reduce)(array, function (basis, value) {
            return basis + value;
        }, 0);
        return result.then(function (sum) {
            expect(sum).toBe(6);
        });
    });
});