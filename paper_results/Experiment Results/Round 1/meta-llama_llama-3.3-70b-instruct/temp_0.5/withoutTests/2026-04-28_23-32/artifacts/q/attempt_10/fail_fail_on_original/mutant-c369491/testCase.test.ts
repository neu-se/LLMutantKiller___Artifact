import { Q } from '../q';

describe('Q promise', () => {
    it('should resolve a promise', async () => {
        const promise = Q('test');
        await expect(promise).resolves.toBe('test');
    });

    it('should call the "then" method with the correct operation', async () => {
        const promise = Q('test');
        const thenSpy = jest.fn();
        promise.then(thenSpy, undefined, undefined);
        await promise;
        expect(thenSpy).toHaveBeenCalledTimes(1);
        expect(thenSpy).toHaveBeenCalledWith('test');
    });
});