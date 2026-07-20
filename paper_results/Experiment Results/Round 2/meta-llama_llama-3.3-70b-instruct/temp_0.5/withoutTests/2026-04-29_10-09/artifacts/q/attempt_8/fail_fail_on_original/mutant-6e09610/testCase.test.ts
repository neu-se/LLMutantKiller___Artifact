import { Q } from "./q.js";

describe('Q promise', () => {
    it('should resolve with the correct value after thenResolve', () => {
        const promise = Q('test value');
        return promise.thenResolve('new value').then((value: string) => {
            expect(value).toBe('new value');
        });
    });

    it('should return the correct value from thenResolve', () => {
        const promise = Q('test value');
        const result = promise.thenResolve('new value');
        return result.then((value: string) => {
            expect(value).toBe('new value');
        });
    });
});