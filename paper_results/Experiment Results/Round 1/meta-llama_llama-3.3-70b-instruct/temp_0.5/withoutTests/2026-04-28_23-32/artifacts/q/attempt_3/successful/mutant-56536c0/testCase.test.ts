import * as q from "../../../../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should resolve a promise in a future turn of the event loop', (done) => {
        const start = Date.now();
        const promise = q.default('test');
        promise.then((value) => {
            const end = Date.now();
            expect(end - start).toBeGreaterThan(0); // Check if the promise was resolved in a future turn
            expect(value).toBe('test');
            done();
        });
    });
});