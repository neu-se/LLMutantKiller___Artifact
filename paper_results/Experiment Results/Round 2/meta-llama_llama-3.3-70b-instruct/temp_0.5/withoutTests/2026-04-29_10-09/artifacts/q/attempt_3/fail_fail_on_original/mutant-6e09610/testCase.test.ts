import { Q } from "../../../../../q.js";

describe('Q promise', () => {
    it('should resolve with the correct value', () => {
        const promise = Q.resolve('test value');
        return promise.thenResolve('new value').then((value) => {
            expect(value).toBe('new value');
        });
    });
});