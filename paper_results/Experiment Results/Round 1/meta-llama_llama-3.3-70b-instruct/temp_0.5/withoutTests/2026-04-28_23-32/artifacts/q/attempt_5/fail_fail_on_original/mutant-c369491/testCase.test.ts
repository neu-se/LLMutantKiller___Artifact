const q = require('./q.js');

describe('Q promise', () => {
    it('should resolve a promise', () => {
        const promise = q('test');
        promise.then((value) => {
            expect(value).toBe('test');
        });
    });

    it('should call the "then" method with the correct operation', () => {
        const promise = q('test');
        const thenSpy = jest.fn();
        promise.then(thenSpy, undefined, undefined);
        expect(thenSpy).toHaveBeenCalledTimes(1);
    });
});