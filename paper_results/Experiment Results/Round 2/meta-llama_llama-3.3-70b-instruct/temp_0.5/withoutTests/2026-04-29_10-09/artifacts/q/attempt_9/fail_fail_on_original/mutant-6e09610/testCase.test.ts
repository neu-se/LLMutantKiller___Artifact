import { Q } from "./q.js";

describe('Q promise', () => {
    it('should resolve with undefined after thenResolve with no argument', () => {
        const promise = Q('test value');
        return promise.thenResolve().then((value: any) => {
            expect(value).toBeUndefined();
        });
    });
});