const q = require('./q');

describe('Q promise', () => {
    it('should resolve a promise', (done) => {
        const promise = q('test');
        promise.then((value: any) => {
            expect(value).toBe('test');
            done();
        });
    });

    it('should call the "then" method with the correct operation', (done) => {
        const promise = q('test');
        const thenSpy = jest.fn();
        promise.then(thenSpy, undefined, undefined);
        expect(thenSpy).toHaveBeenCalledTimes(1);
        done();
    });
});