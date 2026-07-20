import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle array_reduce correctly", () => {
        var array = [1, 2, 3];
        var result = Q(array).then(function(arr: any[]) {
            return arr.reduce(function(acc: number, current: number) {
                return acc + current;
            }, 0);
        });
        return result.then(function(sum: number) {
            expect(sum).toBe(6);
        });
    });
});