import { Q } from "../../../../../../../../subject_repositories/q/q";

describe('Q promise', () => {
    it('should resolve with the correct value', () => {
        const promise = Q.resolve('test value');
        promise.thenResolve('new value').then((value) => {
            expect(value).toBe('new value');
        });
    });
});