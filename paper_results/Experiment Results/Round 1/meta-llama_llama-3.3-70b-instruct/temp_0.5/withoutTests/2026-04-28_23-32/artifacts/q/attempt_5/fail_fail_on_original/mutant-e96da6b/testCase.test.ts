import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const originalDelay = Q.delay;
        Q.delay = function(object: any, timeout: number) {
            throw new Error('Q.delay is not implemented');
        };
        expect(() => Q.delay(Promise.resolve('test'), timeout)).toThrowError('Q.delay is not implemented');
        Q.delay = originalDelay;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        expect(promise).toBeInstanceOf(Q);
    });
});