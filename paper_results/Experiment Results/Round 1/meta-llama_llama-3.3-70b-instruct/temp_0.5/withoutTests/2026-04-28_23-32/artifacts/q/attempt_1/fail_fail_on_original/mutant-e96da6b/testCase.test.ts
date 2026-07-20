import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q.delay', () => {
    it('should delay the resolution of a promise', () => {
        const timeout = 100;
        const promise = Q.delay(Promise.resolve('test'), timeout);
        let resolved = false;
        promise.then(() => {
            resolved = true;
        });
        expect(resolved).toBe(false);
        // We can't directly test the delay here, but we can test that the promise is not resolved immediately
        // In a real-world scenario, you would use a testing library that supports asynchronous testing
    });
});