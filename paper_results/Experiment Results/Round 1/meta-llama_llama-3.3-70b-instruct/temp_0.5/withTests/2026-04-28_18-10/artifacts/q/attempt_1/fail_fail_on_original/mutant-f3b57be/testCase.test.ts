import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe("Q", () => {
    it("should handle array_reduce correctly", () => {
        var array = [1, 2, 3];
        var result = Q(array).then(function(arr) {
            return arr.reduce(function(acc, current) {
                return acc + current;
            }, 0);
        });
        return result.then(function(sum) {
            expect(sum).toBe(6);
        });
    });
});