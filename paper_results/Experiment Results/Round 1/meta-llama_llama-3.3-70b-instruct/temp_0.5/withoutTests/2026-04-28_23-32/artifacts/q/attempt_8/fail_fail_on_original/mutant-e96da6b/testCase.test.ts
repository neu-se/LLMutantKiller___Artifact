import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        expect(promise).toBeTruthy();
        const originalDelay = Q.delay;
        Q.delay = function(object: any, timeout: number) {
            return Promise.resolve();
        };
        const mutatedPromise = Q.delay(Promise.resolve('test'), timeout);
        expect(mutatedPromise).not.toBe(promise);
        Q.delay = originalDelay;
    });
});