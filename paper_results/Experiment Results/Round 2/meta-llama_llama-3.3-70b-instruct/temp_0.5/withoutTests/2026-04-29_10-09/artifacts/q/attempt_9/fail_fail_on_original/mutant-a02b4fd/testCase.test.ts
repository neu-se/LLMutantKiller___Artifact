describe('q.js', () => {
    it('should handle post method correctly', () => {
        const Q = require('../q');
        const object = {
            test: function() {
                return 'test';
            }
        };

        const promise = Q(object).post('test', []);
        return promise.then((result: any) => {
            expect(result).toBe('test');
        });

        const promiseNull = Q(object).post(null, []);
        return promiseNull.then((result: any) => {
            expect(result).toBeUndefined();
        });
    });
});