import { Q } from "../../../../../../../../subject_repositories/q/q.js";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100, new Error('Timeout error'));
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, () => {
            rejected = true;
        });
        setTimeout(() => {
            expect(rejected).toBe(true);
            done();
        }, 150);
    });
});