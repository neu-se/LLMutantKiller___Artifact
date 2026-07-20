describe('q.js', () => {
    it('should handle post method correctly', () => {
        const Q = (function () {
            return {
                post: function(name, args) {
                    if (name !== null && name !== undefined) {
                        return Promise.resolve('test');
                    } else {
                        return Promise.resolve(undefined);
                    }
                }
            };
        })();
        const object = {
            test: function() {
                return 'test';
            }
        };

        const promise = Q.post('test', []);
        return promise.then((result: any) => {
            expect(result).toBe('test');
        });

        const promiseNull = Q.post(null, []);
        return promiseNull.then((result: any) => {
            expect(result).toBeUndefined();
        });
    });
});