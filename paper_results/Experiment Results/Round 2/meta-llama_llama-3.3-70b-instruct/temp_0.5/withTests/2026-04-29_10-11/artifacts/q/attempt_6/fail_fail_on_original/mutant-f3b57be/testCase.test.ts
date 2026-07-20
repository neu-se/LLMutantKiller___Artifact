import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle array_reduce with an array and no initial value", () => {
        var array = [1, 2, 3];
        var result = Q.resolve(array).then(function(array) {
            return array.reduce(function (acc, current) {
                return acc + current;
            });
        });

        return result.then(function (result) {
            expect(result).toBe(6);
        });
    });
});