import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('q.js', () => {
    it('should handle post method correctly', () => {
        const object = {
            test: function() {
                return 'test';
            }
        };

        const promise = Q(object).post('test');
        promise.then((result) => {
            expect(result).toBe('test');
        });

        const promiseNull = Q(object).post(null);
        promiseNull.then((result) => {
            expect(result).toBeUndefined();
        });
    });
});