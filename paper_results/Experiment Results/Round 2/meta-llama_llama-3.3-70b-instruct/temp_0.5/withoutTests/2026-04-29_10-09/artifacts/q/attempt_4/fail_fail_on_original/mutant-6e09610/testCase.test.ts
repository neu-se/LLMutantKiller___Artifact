import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q promise', () => {
    it('should resolve with the correct value', () => {
        const promise = Q.resolve('test value');
        return promise.then((value) => {
            expect(value).toBe('test value');
        });
    });

    it('should resolve with the correct value after thenResolve', () => {
        const promise = Q.resolve('test value');
        return promise.thenResolve('new value').then((value) => {
            expect(value).toBe('new value');
        });
    });
});