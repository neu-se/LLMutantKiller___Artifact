import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        expect(promise).toBeInstanceOf(Q);
        const originalDelay = Q.delay;
        Q.delay = function(object, timeout) {};
        expect(() => Q.delay(Promise.resolve('test'), timeout)).toThrowError();
        Q.delay = originalDelay;
    });
});