import { Q } from "../../../../../../../../subject_repositories/q/q";

describe("Q", () => {
    it("should handle array_reduce with an array and an initial value", () => {
        var array = [1, 2, 3];
        var initial = 10;
        var result = Q.resolve(array).then(function(array) {
            return array.reduce(function (acc, current) {
                return acc + current;
            }, initial);
        });

        return result.then(function (result) {
            expect(result).toBe(16);
        });
    });

    it("should handle array_reduce with an empty array and an initial value", () => {
        var array = [];
        var initial = 10;
        var result = Q.resolve(array).then(function(array) {
            return array.reduce(function (acc, current) {
                return acc + current;
            }, initial);
        });

        return result.then(function (result) {
            expect(result).toBe(initial);
        });
    });
});