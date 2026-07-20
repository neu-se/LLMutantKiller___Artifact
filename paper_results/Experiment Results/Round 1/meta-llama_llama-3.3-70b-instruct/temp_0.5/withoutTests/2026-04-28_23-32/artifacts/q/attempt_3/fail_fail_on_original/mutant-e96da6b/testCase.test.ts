import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        expect(typeof promise.then).toBe('function');
        expect(typeof promise.catch).toBe('function');
        const originalDelay = Q.delay;
        Q.delay = function() {};
        expect(() => Q.delay()).toThrowError();
        Q.delay = originalDelay;
    });
});