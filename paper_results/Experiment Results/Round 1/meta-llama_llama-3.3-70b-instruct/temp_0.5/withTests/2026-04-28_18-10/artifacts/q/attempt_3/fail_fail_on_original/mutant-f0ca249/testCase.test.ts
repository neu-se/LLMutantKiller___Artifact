import { Q } from "../../../../../q.js";

describe('Q', () => {
    it('should handle array reduce correctly', () => {
        var array = [1, 2, 3];
        var deferred = Q.defer();
        var promise = deferred.promise;
        deferred.resolve(array);
        return promise.then((arr: number[]) => {
            return arr.reduce((a: number, b: number) => {
                return a + b;
            }, 0);
        }).then((result: number) => {
            expect(result).toBe(6);
        });
    });
});