import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly', () => {
        var array = [1, 2, 3];
        var sum = Q(array).then(function(arr) {
            return arr.reduce(function(a, b) {
                return a + b;
            }, 0);
        });
        return sum.then(function(result) {
            expect(result).toBe(6);
        });
    });
});