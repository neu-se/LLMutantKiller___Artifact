import { Q } from "../../../q";

describe("Q", () => {
    it("should handle array_reduce correctly for non-empty arrays", () => {
        var array = [1, 2, 3];
        var result = Q(array).then(function(arr: number[]) {
            if (arguments.length === 1) {
                return arr.reduce(function(acc: number, current: number) {
                    return acc + current;
                }, 0);
            } else {
                throw new Error("Invalid number of arguments");
            }
        });
        return result.then(function(sum: number) {
            expect(sum).toBe(6);
        });
    });
});