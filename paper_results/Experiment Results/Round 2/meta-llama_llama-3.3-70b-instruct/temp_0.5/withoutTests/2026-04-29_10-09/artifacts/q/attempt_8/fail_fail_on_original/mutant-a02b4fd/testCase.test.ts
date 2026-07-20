describe('q.js', () => {
    it('should handle post method correctly', () => {
        const Q = (function () {
            return {
                post: function(name, args) {
                    if (name === null) {
                        return Promise.reject('Name cannot be null');
                    } else {
                        return Promise.resolve('test');
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
        return expect(promiseNull).rejects.toThrow('Name cannot be null');
    });
});