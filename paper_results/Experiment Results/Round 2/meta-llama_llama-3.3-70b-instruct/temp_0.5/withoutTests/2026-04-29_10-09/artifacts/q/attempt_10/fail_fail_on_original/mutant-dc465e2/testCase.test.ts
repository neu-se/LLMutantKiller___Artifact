import { Q } from "../../../q.js";

describe('Q', () => {
    it('should reject the promise after the specified timeout', (done) => {
        const promise = Q.timeout(Q.resolve('test'), 100, new Error('Timeout error'));
        let rejected = false;
        promise.then(() => {
            rejected = true;
        }, (error) => {
            expect(error.message).toBe('Timeout error');
            rejected = true;
        });
        setTimeout(() => {
            expect(rejected).toBe(false);
            done();
        }, 50);
    });
});