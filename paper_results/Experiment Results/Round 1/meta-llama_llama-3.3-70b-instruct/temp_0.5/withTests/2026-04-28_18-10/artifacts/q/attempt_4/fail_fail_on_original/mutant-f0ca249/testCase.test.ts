import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should handle array reduce correctly with correct index increment', () => {
        var array = [1, 2, 3];
        var deferred = Q.defer();
        var promise = deferred.promise;
        deferred.resolve(array);
        return promise.then((arr: number[]) => {
            var sum = 0;
            for (var index = 0; index < arr.length; index++) {
                sum += arr[index];
            }
            return sum;
        }).then((result: number) => {
            expect(result).toBe(6);
        });
    });
});